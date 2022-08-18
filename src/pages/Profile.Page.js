import { EditFilled } from "@ant-design/icons";
import { Button, Tabs, Menu, Dropdown } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import componentMap from "../utils/componentMap";
const { TabPane } = Tabs;

const ProfilePage = (props) => {
  const firstName = useSelector((state) => state.AppReducer?.firstName);
  const [userFormType, setUserFormType] = useState("updateprofile");
  const [readonly, setReadonly] = useState(true);

  return (
    <div className="card-container">
      <Tabs type="card" tabPosition="top" size="middle">
        <TabPane tab="Profile" key="Profile">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <h2 style={{ color: "#673ab7" }}>Hi {firstName} </h2>

            <Dropdown
              trigger="hover"
              overlay={
                <Menu
                  style={{
                    border: 0,
                    color: "#673ab7",
                  }}
                >
                  <Menu.Item
                    onClick={() => {
                      setUserFormType("updateprofile");
                      setReadonly(false);
                    }}
                  >
                    Update Profile
                  </Menu.Item>
                  <Menu.Item onClick={() => setUserFormType("updatepassword")}>
                    Update Password
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow
            >
              <Button type="primary" shape="circle">
                <EditFilled title="Edit" />
              </Button>
            </Dropdown>
          </div>
          {componentMap(userFormType, {
            setUserFormType,
            readonly,
            setReadonly,
          })}
        </TabPane>
        {props.subComponents.map((routeObj) => {
          let comp = "";
          console.log("XXX", routeObj);
          if (
            !routeObj?.permission ||
            props.userRoles.find((each) => routeObj.permission.includes(each))
          ) {
            comp = (
              <TabPane tab={routeObj.title} key={routeObj.title}>
                <routeObj.component />
              </TabPane>
            );
          }
          return comp;
        })}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
