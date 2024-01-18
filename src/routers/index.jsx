import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Layout from "@/layout";
import NotFindPage from "../pages/notFinde";
import { connect } from "react-redux";

export const rootRouter = [
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/index",
        element: <Home />,
        meta: {
          title: "首页",
          key: "home",
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录页",
      key: "login",
    },
  },
  //   {
  //     path: "*",
  //     element: <Navigate to="/404" />,
  //   },
  {
    path: "/404",
    element: <NotFindPage />,
  },
];

const Router = (props) => {
  const { routes } = props;
  console.log("???创建路由", routes);
  const menuList = [...rootRouter, ...routes];
  console.log(menuList);
  const routes1 = useRoutes(menuList);
  return routes1;
};

const mapStateToProps = (state) => state.permission;
export default connect(mapStateToProps)(Router);
