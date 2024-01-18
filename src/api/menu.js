import request from "@/utils/request";

// 获取路由
export const getRoutersApi = () => {
  return request({
    url: "/system/auth/list-menus",
    method: "get",
  });
};
