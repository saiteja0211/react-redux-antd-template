import "./App.css";
import "antd/dist/antd.css";

import { Button, Col, Layout, Modal, Row, Spin } from "antd";
import React, { Suspense, lazy, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { cancelModal, updateBreadcrumbs, updateModal } from "./app/appSlice";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "./components/Navigation/BreadCrumb";
import CategoriesPage from "./pages/Categories.Page";
import useAxios from "./utils/useAxios";
import { useEffect } from "react";

const { Header, Content, Footer } = Layout;

const ResultNotFoundPage = lazy(() => import("./pages/ResultNotFound.Page"));
const App = () => {
  const { isLoading, modalVisibility, modalTitle, modalFooter, modalContent } =
    useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { axiosGet, axiosPost } = useAxios();
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    dispatch(
      updateModal({
        modalVisibility: true,
        modalTitle: "Global modal component",
        modalFooter: [
          <Button key="cancel" onClick={cancelModal} size="small">
            Cancel
          </Button>,
          <Button key="submit" type="primary" size="small">
            Submit
          </Button>,
        ],
        modalContent: (
          <div>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
        ),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div>
                <Row>
                  <Col
                    xs={22}
                    sm={22}
                    md={22}
                    lg={22}
                    xl={22}
                    offset={1}
                    style={{ backgroundColor: "#ececec" }}
                  >
                    <BreadCrumb />
                    Apps
                    <Routes>
                      <Route path="/" element={<CategoriesPage />}>
                        <Route path="expenses" element={<div>Expenses</div>} />
                        <Route path="invoices" element={<div>Invoices</div>} />
                        <Route component={ResultNotFoundPage} />
                      </Route>
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
