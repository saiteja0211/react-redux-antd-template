import PropTypes from "prop-types";
import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Guest2Page = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([props.routeTitle]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Guest2 Page</div>;
};

Guest2Page.propTypes = {};

export default Guest2Page;
