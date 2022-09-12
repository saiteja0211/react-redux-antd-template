import PropTypes from "prop-types";
import React from "react";
import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AdminPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([props.routeTitle]));
  }, []);
  return <div>AdminPage</div>;
};

AdminPage.propTypes = {};

export default AdminPage;
