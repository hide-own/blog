/** 运行环境类型 */
type ServiceRuntimeEnvironment =
  | "test" // 测试环境
  | "prod"; // 正式环境

/** 请求的错误类型 */
type ServiceRequestErrorType =
  | "axios" // axios 错误：网络错误, 请求超时, 默认的兜底错误
  | "http" // 请求成功，响应的状态码非 200 的错误
  | "backend"; // 请求成功，响应的状态码为 200，由后端定义的业务错误

/** 请求错误 */
interface ServiceRequestError {
  /** 请求服务的错误类型 */
  type: ServiceRequestErrorType;
  /** 错误码 */
  code: string | number;
  /** 错误信息 */
  msg: string;
  /** 错误信息 */
  message: string;
}

/** 请求结果 */
interface ServiceRequestResult<T = unknown> {
  /** 错误对象 */
  error: ServiceRequestError | null;
  /** 报头信息 */
  headers?: Record<string, string>;
  /** 结果数据 */
  data: T | null;
  /** 错误信息 */
  message: string;
}

type AsyncServiceRequestResult<T = unknown> = Promise<ServiceRequestResult<T>>;
