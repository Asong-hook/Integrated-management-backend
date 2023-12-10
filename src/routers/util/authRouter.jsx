import { useLocation, Navigate } from "react-router-dom";
import { getAccessToken } from '@/utils/auth'
import { loadDictDatas } from '@/redux/modules/auth/action'
import { useDispatch } from 'react-redux'


//白名单  路由 不需要权限鉴定  直接跳转
const WhiteRouterList = ['/login'];
/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props) => {
    const dispatch = useDispatch();
    // eslint-disable-next-line react/prop-types
    const { children } = props
    const { pathname } = useLocation();
    // * 判断当前路由是否需要访问权限(不需要权限直接放行)
    if (WhiteRouterList.includes(pathname)) return children;

    // * 判断是否有Token (无token  直接 进入登录页)
    const token = getAccessToken();
    if (!token) {
        return <Navigate to='/login' replace />;
    } else {
        // dispatch(loadDictDatas())
    }
    return children
}

export default AuthRouter;