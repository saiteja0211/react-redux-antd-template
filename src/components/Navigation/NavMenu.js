import React from "react";
import { Button, Dropdown, Layout, Menu, Badge, Avatar, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ProductSearch from "../SearchBar/ProductSearch";
import { HeartTwoTone, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import LoginModal from "../modalbox/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLoggedIn,
  updateShowLoginModal,
} from "../../redux/actions/ActionCreators";
import useAxios from "../../utils/useAxios";
import CountrySelect from "../CountrySelect";
import Cookies from "js-cookie";

const NavMenu = ({ showSider, setShowSider }) => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, showLoginModal, individualId } = useSelector(
    (state) => state.AppReducer
  );

  const { axiosPost } = useAxios();

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
      path: "/",
      icon: (
        <HeartTwoTone twoToneColor="#eb2f96" className="sm-padding-right" />
      ),
    },
  ];

  const menu = (
    <Menu>
      {menuItems.map(({ label, path, icon, clickEvent, callback }) => (
        <Menu.Item key={label}>
          {path && (
            <Link
              to={path}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onClick={clickEvent}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          )}
        </Menu.Item>
      ))}
      <Menu.Item>
        <li
          type="text"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          onClick={handleLogout}
        >
          <span>
            <LogoutOutlined className="sm-padding-right" />
          </span>
          <span>Log Out</span>
        </li>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout.Header className="navbar">
        <Link to="/">
          <h2 style={{ color: "#fff" }} id="logo">
            BeyondOrder
          </h2>
        </Link>
        <ProductSearch />
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CountrySelect />
        </span>

        {isLoggedIn ? (
          { menu }
        ) : (
          <Button
            type="default"
            className="md-margin-right"
            onClick={() =>
              dispatch(
                updateShowLoginModal({
                  showLoginModal: true,
                  formAlertMessage: "",
                })
              )
            }
          >
            <h4 style={{ color: "#673ab7" }}>Login / Signup</h4>
          </Button>
        )}
      </Layout.Header>

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

export default NavMenu;
