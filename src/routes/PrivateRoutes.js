import * as Routes from "./index";

import { Fragment, useEffect, useState } from "react";

import PropTypes from "prop-types";
import React from "react";
import ResultNotFoundPage from "../pages/ResultNotFound.Page";
import { Route } from "react-router-dom";
import { rolesConfig } from "../config/roles";
import { uniqBy } from "lodash";

const PrivateRoutes = ({ match }) => {
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    let roles = JSON.parse(localStorage.getItem("roles"));
    if (roles) {
      roles = ["common", ...roles];

      let allowedRoutes = roles.reduce((acc, role) => {
        return [...acc, ...rolesConfig[role].routes];
      }, []);

      // For removing duplicate entries, compare with 'url'.
      allowedRoutes = uniqBy(allowedRoutes, "url");
      setAllowedRoutes(allowedRoutes);
    } else {
      this.props.history.push("/");
    }
  }, []);

  return (
    <Fragment>
      <Routes>
        {allowedRoutes.map((route) => (
          <Route
            exact
            key={route.url}
            component={Routes[route.component]}
            path={`${match.path}${route.url}`}
          />
        ))}
        <Route element={<ResultNotFoundPage />} />
      </Routes>
    </Fragment>
  );
};

PrivateRoutes.propTypes = {};

export default PrivateRoutes;
