import React from "react";
import {
  Button,
  Dropdown,
  Avatar,
  Row,
  Col,
  Layout,
  Menu,
  message,
  Drawer,
} from "antd";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import ProductSearch from "../SearchBar/ProductSearch";
import { HeartTwoTone, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import LoginModal from "../modalbox/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLoggedIn,
  updateShowLoginModal,
  updateShowMenuDrawer,
} from "../../redux/actions/ActionCreators";
import useAxios from "../../utils/useAxios";
import CountrySelect from "../CountrySelect";

const TopNavBar = ({ showSider, setShowSider }) => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { axiosPost } = useAxios();

  const { isLoggedIn, showLoginModal, showMenuDrawer, individualId } =
    useSelector((state) => state.AppReducer);

  const handleLogout = async () => {
    try {
      await axiosPost({
        url: "individuals/logout",
      });
      dispatch(updateIsLoggedIn(false));
      message.success("Logged out successfully.", 6);
      history.push("/");
      localStorage.setItem("boWIts" + individualId, JSON.stringify([]));
    } catch (err) {
      console.log("Unable logout", err);
      message.error("Unable logout at this moment!", 6);
    }
  };

  const menuItems = [
    {
      label: "My Profile",
      path: "/myprofile",
      icon: <UserOutlined className="sm-padding-right" />,
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: (
        <HeartTwoTone twoToneColor="#eb2f96" className="sm-padding-right" />
      ),
    },

    {
      label: "Log Out",
      path: "/",
      icon: <LogoutOutlined className="sm-padding-right" />,
      clickEvent: handleLogout,
    },
  ];

  const menu = menuItems.map(({ label, path, icon, clickEvent, callback }) => (
    <Menu.Item className="drawer__menu__item" key={label}>
      {path && (
        <Link
          to={path}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onClick={() => {
            console.log("MenuItem");
            dispatch(updateShowMenuDrawer(false));
            if (typeof clickEvent === "function") {
              clickEvent();
            }
          }}
        >
          <h4>
            <span>{icon}</span>
            <span>{label}</span>
          </h4>
        </Link>
      )}
    </Menu.Item>
  ));

  return (
    <>
      <Row className="navbar">
        <Col xs={16} sm={18} md={6} lg={6} xl={6} xxl={6}>
          <Link to="/">
            <h2 id="logo"></h2>
          </Link>
        </Col>

        <Col xs={0} sm={0} md={12} lg={12} xl={10} xxl={10}>
          <ProductSearch />
        </Col>

        <Col xs={0} sm={0} md={6} lg={6} xl={8} xxl={8}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ margin: "15px 20px" }}>
              <CountrySelect />
            </span>

            {isLoggedIn ? (
              <Dropdown
                trigger="hover"
                overlayStyle={{ zIndex: "9999999" }}
                overlay={<Menu style={{ paddingBottom: 0 }}>{menu}</Menu>}
                placement="bottomCenter"
                arrow
              >
                <Avatar
                  style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                  size="large"
                  src={require(`../../assets/user_avatar.svg`).default}
                />
              </Dropdown>
            ) : (
              <Button
                onClick={() =>
                  dispatch(
                    updateShowLoginModal({
                      showLoginModal: true,
                      formAlertMessage: "",
                    })
                  )
                }
              >
                <h4>Login / Signup</h4>
              </Button>
            )}
          </div>
        </Col>
        <Col xs={8} sm={6} md={0} lg={0} xl={0} xxl={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ margin: "15px 20px" }}>
              <CountrySelect />
            </span>

            <Button
              type="primary"
              shape="circle"
              onClick={() => dispatch(updateShowMenuDrawer(true))}
            >
              <MenuOutlined />
            </Button>
          </div>
        </Col>
      </Row>

      <Drawer
        title={<div id="drawer-logo"></div>}
        placement="right"
        width={"100%"}
        style={{ zIndex: 99999999999 }}
        onClose={() => {
          console.log("Drawerclose");
          dispatch(updateShowMenuDrawer(false));
        }}
        visible={showMenuDrawer}
      >
        <ProductSearch />

        <Menu
          style={{
            border: 0,
            color: "#673ab7",
            marginTop: 10,
          }}
        >
          <Menu.Item className="drawer__menu__item" key="Home__Drawer">
            <Link
              to="/"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onClick={() => {
                console.log("menu home item");
                dispatch(updateShowMenuDrawer(false));
              }}
            >
              <h4>
                <span>
                  <HomeOutlined className="sm-padding-right" />
                </span>
                <span>Home</span>
              </h4>
            </Link>
          </Menu.Item>

          {isLoggedIn ? (
            menu
          ) : (
            <Menu.Item className="drawer__menu__item" key="Home">
              <Link
                to="/"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={() => {
                  dispatch(
                    updateShowLoginModal({
                      showLoginModal: true,
                      formAlertMessage: "",
                    })
                  );
                  dispatch(updateShowMenuDrawer(false));
                }}
              >
                <h4>Login / Signup</h4>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
      <LoginModal
        visible={showLoginModal}
        onCancel={(show) =>
          dispatch(
            updateShowLoginModal({
              showLoginModal: show,
              formAlertMessage: "",
            })
          )
        }
        defaultForm="log-in"
      />
    </>
  );
};

export default TopNavBar;

// <div>Search</div>
// <div>Home</div>
// <div>Login/SignUp</div>
// <div>My Profile</div>
// <div>Wishlist</div>
// <div>Logout</div>
