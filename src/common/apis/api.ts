import { NetEase } from "../service";

//登录
type loginType = {
  phone: string;
  password: string;
};
export function login(data: loginType): AsyncServiceRequestResult<unknown> {
  return NetEase.get("/login/cellphone", { params: data });
}

//获取验证码
export function captcha(data: {
  phone: string;
}): AsyncServiceRequestResult<unknown> {
  return NetEase.get("/captcha/sent", { params: data });
}

//获取验证码
type verifyCaptchaType = {
  phone: string;
  captcha: string;
};
export function verifyCaptcha(
  data: verifyCaptchaType
): AsyncServiceRequestResult<unknown> {
  return NetEase.get("/captcha/verify", { params: data });
}
