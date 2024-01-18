import * as types from "@/redux/mutation-types";
import { getRoutersApi } from "@/api/menu";

// 获取用户路由
export const GenerateRoutes = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getRoutersApi()
        .then((res) => {
          console.log("路由", res);
          dispatch({
            type: types.SET_MENUS,
            payload: res.data,
          });
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
