import PropTypes from "prop-types";
import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Guest1Page = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([props.routeTitle]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Guest1 Page</div>;
};

Guest1Page.propTypes = {};

export default Guest1Page;
