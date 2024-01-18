import * as types from "@/redux/mutation-types";
import { getInfoApi, logoutApi } from "@/api/login";
import { removeToken } from "@/utils/auth";

// 获取用户信息
export const getInfo = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getInfoApi()
        .then((res) => {
          // 没有 data 数据，赋予个默认值
          if (!res) {
            res = {
              data: {
                roles: [],
                user: {
                  id: "",
                  avatar: "",
                  userName: "",
                  nickname: "",
                },
              },
            };
          }
          res = res.data; // 读取 data 数据
          res.avatar =
            res.avatar === "" || res.avatar == null
              ? import("@/assets/images/profile.png")
              : res.avatar;
          dispatch({
            type: types.SET_USER_INFO,
            payload: res,
          });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

//退出系统
export const LogOut = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      logoutApi()
        .then(() => {
          dispatch({
            type: types.SET_USER_INFO,
            payload: {
              roles: [],
              permissions: [],
              user: {
                id: "",
                avatar: "",
                userName: "",
                nickname: "",
              },
              dept: "",
            },
          });
          removeToken();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
