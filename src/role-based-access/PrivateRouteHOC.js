import PropTypes from "prop-types";
import UnauthorisedPage from "../pages/Unauthorised.Page";

const PrivateRouteHOC =
  ({ userRoles, allowedRoles }) =>
  (Component) => {
    let RenderComponent = "";

    if (allowedRoles) {
      if (!userRoles || (Array.isArray(userRoles) && userRoles.length === 0)) {
        RenderComponent = UnauthorisedPage;
      } else {
        RenderComponent = userRoles.find((each) => allowedRoles.includes(each))
          ? Component
          : UnauthorisedPage;
      }
    } else {
      RenderComponent = Component;
    }

    return RenderComponent;
  };
PrivateRouteHOC.propTypes = {};

export default PrivateRouteHOC;
