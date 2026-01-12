import {AxiosInstance, AxiosRequestConfig} from "axios";
import {wait} from "../shared";

/**
 * 登录时的回调函数
 * */

export async function waitLoginComplete<T>(
    config: AxiosRequestConfig<ServiceRequestResult<T>>,
    axios: AxiosInstance,
): Promise<ServiceRequestResult<T>> {
    // useProfileStore().loginDialogVisible = true;   打开登录弹窗
    if (!(await wait("loginResult"))) {
        return {
            error: {
                type: "backend",
                code: 401,
                msg: "用户未授权~",
            },
            data: null,
        };
    }
    /** 执行回调 */
    return axios.request(config);
}
