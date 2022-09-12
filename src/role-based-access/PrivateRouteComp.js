import PropTypes from "prop-types";
import UnauthorisedPage from "../pages/Unauthorised.Page";

const PrivateRouteComp = ({
  userRoles,
  allowedRoles,
  routeTitle,
  component,
}) => {
  let RenderComponent = "";

  if (allowedRoles) {
    if (!userRoles || (Array.isArray(userRoles) && userRoles.length === 0)) {
      RenderComponent = UnauthorisedPage;
    } else {
      RenderComponent = userRoles.find((each) => allowedRoles.includes(each))
        ? component
        : UnauthorisedPage;
    }
  } else {
    RenderComponent = component;
  }

  return RenderComponent;
};
PrivateRouteComp.propTypes = {};

export default PrivateRouteComp;
