import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,} from "axios";
import {waitLoginComplete} from "./auth";

//持久化
import {user} from "@/store/user";

const userStore = user();

type RequestMethod = "get" | "post" | "put" | "delete";

interface ResponseData {
    code: number;
    msg: string;
    data: unknown;
}

const REQUEST_TIMEOUT = 60 * 1000; // 请求超时时间
const DEFAULT_REQUEST_ERROR_CODE = "DEFAULT"; // 默认的请求错误code
const DEFAULT_REQUEST_ERROR_MSG = "请求错误~"; // 默认的请求错误文本
const REQUEST_TIMEOUT_CODE = "ECONNABORTED"; // 请求超时的错误code(为固定值：ECONNABORTED)
const REQUEST_TIMEOUT_MSG = "请求超时~"; // 请求超时的错误文本
const REQUEST_JITTER_CODE = "JITTER"; // 请求太频繁的错误code
const REQUEST_JITTER_MSG = "您请求太频繁了，请休息一会"; // 请求太频繁的错误文本
const NETWORK_ERROR_CODE = "NETWORK_ERROR"; // 网络不可用的code
const NETWORK_ERROR_MSG = "网络不可用~"; // 网络不可用的错误文本
const RESPONSE_ERROR_CODE = "INVALID_DATA"; // 响应的数据错误的code
const RESPONSE_ERROR_MSG = "服务器响应异常"; //  响应的数据错误文本
const API_OVERSTEP_CODE = "OVERSTEP"; // 越界请求接口的错误code
const API_OVERSTEP_MSG = "请求越界"; // 越界请求接口的错误文本

/** 请求不成功各种状态的错误 */
export const ERROR_STATUS = {
    400: "400: 请求出现语法错误~",
    401: "401: 用户未授权~",
    403: "403: 服务器拒绝访问~",
    404: "404: 请求的资源不存在~",
    405: "405: 请求方法未允许~",
    408: "408: 网络请求超时~",
    500: "500: 服务器内部错误~",
    501: "501: 服务器未实现请求功能~",
    502: "502: 错误网关~",
    503: "503: 服务不可用~",
    504: "504: 网关超时~",
    505: "505: http版本不支持该请求~",
    [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
};

export type ErrorStatus = keyof typeof ERROR_STATUS;

/** 检车数据格式*/
export function isResponseData(data: unknown): data is ResponseData {
    return data != null && typeof data === "object" && "code" in data;
}

/** 打印错误 */
export function showErrorMsg(error: ServiceRequestError): void {
    console.log(error);
}

/**
 * 处理axios请求失败的错误
 *
 * @param {AxiosError} axiosError
 * @return {ServiceRequestResult}
 */
async function handleAxiosError<T>(axiosError: AxiosError<Record<string, unknown>>,): Promise<ServiceRequestResult<T>> {
    const error: ServiceRequestError = {
        type: "axios",
        code: DEFAULT_REQUEST_ERROR_CODE,
        msg: DEFAULT_REQUEST_ERROR_MSG,
    };
    if (!window.navigator.onLine || axiosError.message === "Network Error") {
        // 网络错误
        error.code = NETWORK_ERROR_CODE;
        error.msg = NETWORK_ERROR_MSG;
    } else if (
        axiosError.code === REQUEST_TIMEOUT_CODE &&
        axiosError.message.includes("timeout")
    ) {
        // 超时错误
        error.code = REQUEST_TIMEOUT_CODE;
        error.msg = REQUEST_TIMEOUT_MSG;
    }
    // 请求不成功的错误
    const errorCode: ErrorStatus =
        ((axiosError.response as AxiosResponse | undefined)
            ?.status as ErrorStatus) || "DEFAULT";
    error.code = errorCode;
    error.msg = <string>axiosError.response?.data?.message || ERROR_STATUS[errorCode];
    showErrorMsg(error);
    return { error, data: null };
}

/**
 * 处理请求成功后的错误
 *
 * @param {AxiosInstance} axios
 * @param {AxiosResponse} response
 * @return {ServiceRequestResult}
 */
async function handleResponseError<T = unknown>(
    axios: AxiosInstance,
    response: AxiosResponse,
): Promise<ServiceRequestResult<T>> {
    const error: ServiceRequestError = {
        type: "http",
        code: DEFAULT_REQUEST_ERROR_CODE,
        msg: DEFAULT_REQUEST_ERROR_MSG,
    };
    if (!window.navigator.onLine) {
        // 网络错误
        error.code = NETWORK_ERROR_CODE;
        error.msg = NETWORK_ERROR_MSG;
    } else if (response.status === 401 || response.data.code === 401) {
        // 弹出登录框等待登录  vuex里面设置
        userStore.modifyToken(null);
        return await waitLoginComplete(response.config, axios);
    } else {
        const errorCode: ErrorStatus = response.status as ErrorStatus;
        error.code = errorCode;
        error.msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
    }
    showErrorMsg(error);
    return { error, data: null };
}

/**
 * 处理返回的刷新令牌错误
 * @return {ServiceRequestResult}
 */
async function handleRefreshTokenError<T>(): Promise<ServiceRequestResult<T>> {
    return {
        error: {
            type: "backend",
            code: 401,
            msg: ERROR_STATUS[401],
        },
        data: null,
    };
}

/** 创建axios*/
export function createAxios(axiosConfig: AxiosRequestConfig,): AxiosInstance {
    const instance = axios.create(axiosConfig);
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const handleConfig: InternalAxiosRequestConfig = { ...config };
        const token: string | null = userStore.token;
        if (token != null) {
            handleConfig.headers["Authorization"] = token;
        }
        if (!handleConfig.timeout) {
            handleConfig.timeout = REQUEST_TIMEOUT;
        }
        return handleConfig;
    });

    // @ts-ignore 忽略类型检查，因为这里的返回类型比较复杂
    instance.interceptors.response.use((response: AxiosResponse,): Promise<ServiceRequestResult> | ServiceRequestResult => {
            // HTTP响应状态不在有效氛围内。
            if (
                response.status < 200 ||
                (response.status >= 300 && response.status !== 304)
            ) {
                return handleResponseError(instance, response);
            }
            // 刷新了授权令牌，则重新存放。
            if (response.headers.authorization) {
                const token: string = response.headers.authorization ?? "";
                if (token === "") {
                    // 不是有效地刷新令牌。
                    return handleRefreshTokenError();
                }
                userStore.modifyToken(token);
            }
            const headers = { ...response.headers };
            const error: ServiceRequestError = {
                type: "backend",
                code: response.status,
                msg: "请求失败",
            };
            if (!window.navigator.onLine) {
                // 网络错误
                error.type = "axios";
                error.code = NETWORK_ERROR_CODE;
                error.msg = NETWORK_ERROR_MSG;
            } else if (!isResponseData(response.data)) {
                // 数据不符合预期
                error.type = "backend";
                error.code = RESPONSE_ERROR_CODE;
                error.msg = RESPONSE_ERROR_MSG;
            } else if (response.data.code === 401) {
                // 弹出登录框等待登录
                userStore.modifyToken(null);
                return waitLoginComplete(response.config, instance);
            } else if (response.data.code === 402) {
                // 接口无权限
                error.code = API_OVERSTEP_CODE;
                error.msg = API_OVERSTEP_MSG;
            } else if (response.data.code === 409) {
                // 请求太频繁
                error.code = REQUEST_JITTER_CODE;
                error.msg = REQUEST_JITTER_MSG;
            } else if (response.data.code === 500) {
                // 服务器错误
                error.code = 500;
                error.msg = response.data.msg || ERROR_STATUS[500];
            } else {
                // 请求成功
                return {
                    error: null,
                    headers,
                    data: response.data,
                };
            }
            showErrorMsg(error);
            return { error, headers, data: null };
        },
        (axiosError: AxiosError<Record<string, unknown>>) => {
            return handleAxiosError(axiosError);
        },
    );
    return instance;
}

export interface RequestUtils {
    /**
     * get请求
     * @param url - 请求地址
     * @param config - axios配置
     */
    get<T = unknown>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<ServiceRequestResult<T>>;

    /**
     * post请求
     * @param url - 请求地址
     * @param data - 请求的body的data
     * @param config - axios配置
     */
    post<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ServiceRequestResult<T>>;

    /**
     * put请求
     * @param url - 请求地址
     * @param data - 请求的body的data
     * @param config - axios配置
     */
    put<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<ServiceRequestResult<T>>;

    /**
     * delete请求
     * @param url - 请求地址
     * @param config - axios配置
     */
    delete<T = unknown>(url: string, config: AxiosRequestConfig,): Promise<ServiceRequestResult<T>>;
}

/**
 * 创建请求
 * @param axiosConfig - axios配置
 */
export function createRequestUtils(axiosConfig: AxiosRequestConfig,): RequestUtils {
    const instance = createAxios(axiosConfig);
    return {
        get: <T = unknown>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<ServiceRequestResult<T>> =>
            getRequestResponse(instance, "get", url, undefined, config),
        post: <T = unknown>(
            url: string,
            data?: unknown,
            config?: AxiosRequestConfig,
        ): Promise<ServiceRequestResult<T>> =>
            getRequestResponse(instance, "post", url, data, config),
        put: <T = unknown>(
            url: string,
            data?: unknown,
            config?: AxiosRequestConfig,
        ): Promise<ServiceRequestResult<T>> =>
            getRequestResponse(instance, "put", url, data, config),
        delete: <T = unknown>(
            url: string,
            config: AxiosRequestConfig,
        ): Promise<ServiceRequestResult<T>> =>
            getRequestResponse(instance, "delete", url, undefined, config),
    };
}

async function getRequestResponse<T>(
    instance: AxiosInstance,
    method: RequestMethod,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<ServiceRequestResult<T>> {
    switch (method) {
        case "get":
            return instance.get(url, config);
        case "delete":
            return instance.delete(url, config);
        case "post":
            return instance.post(url, data, config);
        case "put":
            return instance.put(url, data, config);
    }
}
