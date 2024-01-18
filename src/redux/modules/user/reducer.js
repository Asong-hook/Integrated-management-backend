import { produce } from "immer";
import * as types from "@/redux/mutation-types";

const globalState = {
    id: 0, // 用户编号
    userName: '',
    avatar: '', //用户头像
    dept:{},//登录者的部门账号信息
    roles: [], //登录者 角色
    permissions: [], //登录者 权限标识
    roleNames: [],
    nickname: '',
    unReadNumber: '',//未读信息数量
};

const user = (state = globalState, action) => produce(state, draftState => {
    switch (action.type) {
        case types.SET_USER_INFO:
            draftState.id= action.payload.user.id;
            draftState.userName= action.payload.user.userName;
            draftState.avatar= action.payload.user.avatar;
            draftState.nickname= action.payload.user.nickname;
            draftState.dept= action.payload.dept;
            draftState.roleNames= action.payload.roleNames;
            draftState.permissions= action.payload.permissions;
            draftState.roles= action.payload.roles;
            break;
        default:
            return draftState;
    }
});
export default user;