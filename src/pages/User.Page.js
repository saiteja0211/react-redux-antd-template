import PropTypes from "prop-types";
import React from "react";
import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UserPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([props.routeTitle]));
  }, []);
  return <div>UserPage</div>;
};

UserPage.propTypes = {};

export default UserPage;
