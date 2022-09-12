import "./App.css";
import "antd/dist/antd.css";

import { Col, Layout, Modal, Row, Spin } from "antd";
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  privateRoutes,
  publicRoutes,
} from "../role-based-access/access-routes";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../components/Navigation/BreadCrumb";
import Home from "../pages/Home";
import NavBar from "../components/Navigation/NavBar";
import PrivateRouteComp from "../role-based-access/PrivateRouteComp";
import ResultNotFound from "../pages/ResultNotFound.Page";
import { cancelModal } from "./appSlice";

// import useAxios from "../utils/custom-hooks/useAxios";

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    isLoading,
    modalVisibility,
    modalTitle,
    modalFooter,
    modalContent,
    userRoles,
  } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  // const { axiosGet, axiosPost } = useAxios();
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
            <Header>
              <NavBar />
            </Header>
            <Content className="layout-body">
              <Row>
                <Col span={22} offset={1}>
                  <BreadCrumb />

                  <div
                    style={{
                      backgroundColor: "#ececec",
                      padding: 10,
                      minHeight: "80vh",
                    }}
                  >
                    <Routes>
                      <Route path="/" title="Home" element={<Home />} />

                      {publicRoutes.map((route) => (
                        <Route
                          path={route.path}
                          title={route.title}
                          element={<route.component routeTitle={route.title} />}
                        />
                      ))}

                      {privateRoutes.map((route) => {
                        const Comp = PrivateRouteComp({
                          userRoles,
                          allowedRoles: route.permission,
                          routeTitle: route.title,
                          component: route.component,
                        });
                        return (
                          <Route
                            path={route.path}
                            title={route.title}
                            element={<Comp routeTitle={route.title} />}
                          />
                        );
                      })}

                      <Route path="*" element={<ResultNotFound />} />
                    </Routes>
                  </div>
                </Col>
              </Row>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                backgroundColor: "#fff",
                marginTop: 10,
              }}
            >
              Footer ©2022
            </Footer>
          </Spin>
        </Suspense>
      </Router>

      <Modal
        // width={50%"}
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
