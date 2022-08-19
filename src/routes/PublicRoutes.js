import { Route, Routes } from "react-router-dom";

import { Fragment } from "react";
import Home from "../pages/Home";
import ResultNotFoundPage from "../pages/ResultNotFound.Page";

const PublicRoutes = ({ match }) => (
  <Fragment>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route element={<ResultNotFoundPage />} />
    </Routes>
  </Fragment>
);

export default PublicRoutes;
