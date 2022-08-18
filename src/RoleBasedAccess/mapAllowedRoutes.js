import { Route } from "react-router-dom";
import UnauthorisedPage from "../pages/Unauthorised.Page";

const mapAllowedRoutes = ({ routeObj, userRoles }) => {
  let RoutToComponent = <div></div>;

  if (routeObj?.permission) {
    if (!userRoles || (Array.isArray(userRoles) && userRoles.length === 0)) {
      /* temporary fallback when user directly hits a path which needs to check for user role-permission to render component respectively
      else user will be show unauthorised first and later getroles api gives response then respective component displayed */
      RoutToComponent = "";
    } else {
      RoutToComponent = userRoles.find((each) =>
        routeObj.permission.includes(each)
      )
        ? routeObj.component
        : UnauthorisedPage;
    }
  } else {
    RoutToComponent = routeObj.component;
  }

  return (
    <Route path={routeObj.path}>
      {RoutToComponent ? (
        <RoutToComponent
          subComponents={routeObj.subComponents}
          userRoles={userRoles}
        />
      ) : (
        <div></div>
      )}
    </Route>
  );
};

export default mapAllowedRoutes;
