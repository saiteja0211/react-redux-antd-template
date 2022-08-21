import { lazy } from "react";
import roles from "./roles";

/* 
pathname: {
  component: ComponentTobeRendered,
  title: "title of the page/component",
  permission: [allowed roles for access],
}
*/
const publicRoutes = [
  {
    component: lazy(() => import("../components/LoginForm")),
    path: "/login",
    title: "Log-in",
  },

  {
    component: lazy(() => import("../pages/Guest1.Page")),
    path: "/guest1page",
    title: "Guest1 Page",
  },
  {
    component: lazy(() => import("../pages/Guest2.Page")),
    path: "/guest2page",
    title: "Guest2 Page",
  },
];

const getPermissions = (permissions) => {
  return [...permissions, roles.ADMIN];
};

const privateRoutes = [
  {
    component: lazy(() => import("../pages/Manager.Page")),
    path: "/managerpage",
    title: "Manager Page",
    permission: getPermissions([roles.MANAGER]),
  },
  {
    component: lazy(() => import("../pages/User.Page")),
    path: "/userpage",
    title: "User Page",
    permission: getPermissions([roles.USER]),
  },
  {
    component: lazy(() => import("../pages/Admin.Page")),
    path: "/adminpage",
    title: "Admin Page",
    permission: getPermissions([]),
  },
];

export { publicRoutes, privateRoutes };
