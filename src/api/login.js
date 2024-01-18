import request from "@/utils/request";
import { getRefreshToken } from "@/utils/auth";

// 登录方法
export function LoginApi(
  username,
  password,
  captchaVerification,
  socialType,
  socialCode,
  socialState,
  deptType
) {
  const data = {
    username,
    password,
    captchaVerification,
    // 社交相关
    socialType,
    socialCode,
    socialState,
    deptType,
  };
  return request({
    url: "/system/auth/login",
    method: "post",
    data: data,
  });
}

// 刷新访问令牌
export function refreshToken() {
  return request({
    url: "/system/auth/refresh-token?refreshToken=" + getRefreshToken(),
    method: "post",
  });
}

// 获取验证图片  以及token
export function reqGet(data) {
  return request({
    url: "system/captcha/get",
    method: "post",
    data,
  });
}

// 滑动或者点选验证
export function reqCheck(data) {
  return request({
    url: "/system/captcha/check",
    method: "post",
    data,
  });
}

// 获取用户详细信息
export function getInfoApi() {
  return request({
    url: "/system/auth/get-permission-info",
    method: "get",
  });
}

//退出登录接口
export function logoutApi() {
  return request({
    url: "/system/auth/logout",
    method: "post",
  });
}
