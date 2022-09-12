import { Button, Col, Dropdown, Menu, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import roles from "../../role-based-access/roles";
import { updateRole } from "../../app/appSlice";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const userRoles = useSelector((state) => state.app.userRoles);

  useEffect(() => {
    let menuItems = Object.entries(roles).map(([label, key]) => {
      return {
        key,
        label,
      };
    });
    setItems(menuItems);
  }, []);

  const toggleRole = (menuItem) => {
    console.log(menuItem);
    dispatch(updateRole([menuItem.key]));
  };

  console.log(userRoles);
  return (
    <Row justify="space-between">
      <h3 style={{ color: "#fff" }}>LOGO</h3>

      <span style={{ color: "#fff" }}>You have '{userRoles}' access </span>

      <Row gutter={20} justify="space-evenly" align="middle">
        <Col>
          <Link to="/guest1page">Guest1</Link>
        </Col>
        <Col>
          <Link to="/guest2page">Guest2</Link>
        </Col>
        <Col>
          <Link to="/userpage">User</Link>
        </Col>
        <Col>
          <Link to="/managerpage">Manager</Link>
        </Col>
        <Col>
          <Link to="/adminpage">Admin</Link>
        </Col>

        <Col>
          <Link to="/sakcmasklmc">Not Found</Link>
        </Col>
        <Col>
          <Button onClick={() => {}}></Button>

          <Dropdown
            arrow
            overlay={
              <Menu
                onClick={(item) => {
                  toggleRole(item);
                }}
                items={items}
              />
            }
          >
            <Button type="primary" shape="round">
              Change Role <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Row>
  );
};

NavBar.propTypes = {};

export default NavBar;
