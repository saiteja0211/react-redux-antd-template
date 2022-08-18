import { Breadcrumb } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const BreadCrumb = () => {
  const { breadCrumbItems } = useSelector((state) => state.app);

  return (
    <Breadcrumb separator=">" style={{ paddingBottom: 10 }}>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeFilled />
        </Link>
      </Breadcrumb.Item>
      {Array.isArray(breadCrumbItems) &&
        breadCrumbItems.map((item) => (
          <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
