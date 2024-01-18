import { useLocation, Navigate } from "react-router-dom";
import { getAccessToken } from "@/utils/auth";
import { loadDictDatas } from "@/redux/modules/dic/action";
import { getInfo, LogOut } from "@/redux/modules/user/action";
import { GenerateRoutes } from "@/redux/modules/permission/action";
import { useDispatch, connect } from "react-redux";
import { isRelogin } from "@/utils/request";
import { App } from "antd";

//白名单  路由 不需要权限鉴定  直接跳转
const WhiteRouterList = ["/login"];
/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props) => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  // eslint-disable-next-line react/prop-types
  const { children, roles } = props;
  const { pathname } = useLocation();

  // * 判断是否有Token (无token  直接 进入登录页)
  const token = getAccessToken();
  if (!token) {
    // * 判断当前路由是否需要访问权限(不需要权限直接放行)
    if (WhiteRouterList.includes(pathname)) return children;
    //否则进入登录页
    return <Navigate to="/login" replace />;
  } else {
    //如果有token  则不允许进入登录页  只能通过退出登录
    if (pathname === "/login") {
      return <Navigate to="/" replace />;
    } else {
      console.log(roles, "roles");
      if (roles?.length === 0) {
        isRelogin.show = true;
        //获取字典数据
        dispatch(loadDictDatas());
        dispatch(getInfo())
          .then(() => {
            isRelogin.show = false;
            dispatch(GenerateRoutes()).then(() => {
              <Navigate to={pathname} replace />;
            });
          })
          .catch((err) => {
            dispatch(LogOut()).then(() => {
              message.error(err);
              return <Navigate to="/login" replace />;
            });
          });
      } else {
        return children;
      }
    }
  }
};

const mapStateToProps = (state) => state.user;
export default connect(mapStateToProps)(AuthRouter);
