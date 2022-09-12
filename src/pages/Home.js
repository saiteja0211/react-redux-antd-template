import PropTypes from "prop-types";
import React from "react";
import { updateBreadcrumbs } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbs([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Home</div>;
};

Home.propTypes = {};

export default Home;
