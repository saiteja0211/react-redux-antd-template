import "./App.css";
import "antd/dist/antd.css";

import { Col, Layout, Modal, Row, Spin } from "antd";
import React, { Suspense, lazy, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../components/Navigation/BreadCrumb";
import PrivateRoutes from "../routes/PrivateRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import UnauthorisedPage from "../pages/Unauthorised.Page";
import { cancelModal } from "./appSlice";
import useAxios from "../utils/useAxios";
import { useEffect } from "react";

const { Header, Content, Footer } = Layout;

const ResultNotFoundPage = lazy(() => import("../pages/ResultNotFound.Page"));
const App = () => {
  const { isLoading, modalVisibility, modalTitle, modalFooter, modalContent } =
    useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { axiosGet, axiosPost } = useAxios();
  const [userRoles, setUserRoles] = useState([]);

  // useEffect(() => {
  //   dispatch(
  //     updateModal({
  //       modalVisibility: true,
  //       modalTitle: "Global modal component",
  //       modalFooter: [
  //         <Button key="cancel" onClick={cancelModal} size="small">
  //           Cancel
  //         </Button>,
  //         <Button key="submit" type="primary" size="small">
  //           Submit
  //         </Button>,
  //       ],
  //       modalContent: (
  //         <div>
  //           <p>Some contents...</p>
  //           <p>Some contents...</p>
  //           <p>Some contents...</p>
  //         </div>
  //       ),
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Layout id="top">
      <Router>
        <Suspense
          fallback={
            <Spin
              size="large"
              tip="Loading..."
              spinning={true}
              className="app-spinner"
            >
              <div></div>
            </Spin>
          }
        >
          <Spin
            size="large"
            tip="Loading..."
            spinning={isLoading}
            className="app-spinner"
            // delay={500}
          >
            <Header>NavBar</Header>
            <Content className="layout-body">
              <div className="card-shadow">
                <Row>
                  <Col
                    xs={22}
                    sm={22}
                    md={22}
                    lg={22}
                    xl={22}
                    offset={1}
                    style={{ backgroundColor: "#ececec", padding: 20 }}
                  >
                    <BreadCrumb />
                    Apps
                    <Routes>
                      <Route exact path="/" render={<PublicRoutes />} />
                      <Route path="/app" component={<PrivateRoutes />} />
                      <Route path="*" element={<ResultNotFoundPage />} />
                    </Routes>
                  </Col>
                </Row>
              </div>
            </Content>
            <Footer>Footer</Footer>
          </Spin>
        </Suspense>
      </Router>

      <Modal
        width={"30%"}
        destroyOnClose={true}
        title={modalTitle}
        footer={modalFooter}
        visible={modalVisibility}
        onCancel={() => dispatch(cancelModal())}
      >
        {modalContent}
      </Modal>
    </Layout>
  );
};

export default App;

/* <Route path="/" element={<CategoriesPage />}>
<Route path="expenses" element={<div>Expenses</div>} />
<Route path="invoices" element={<div>Invoices</div>} />
<Route component={ResultNotFoundPage} />
</Route>
</Routes> */
