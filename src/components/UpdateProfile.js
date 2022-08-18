import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Row, message, Col } from "antd";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";

const { Option } = Select;
const tailFormItemLayout = {
  labelCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 9,
      offset: 0,
    },
    md: {
      span: 6,
      offset: 0,
    },
    lg: {
      span: 5,
      offset: 0,
    },
    xl: {
      span: 4,
      offset: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 15,
      offset: 0,
    },
    md: {
      span: 18,
      offset: 0,
    },
    lg: {
      span: 19,
      offset: 0,
    },
    xl: {
      span: 20,
      offset: 0,
    },
  },
};

const UpdateProfile = ({ setUserFormType, readonly, setReadonly }) => {
  const [form] = Form.useForm();
  const { axiosPost } = useAxios();

  const [user, setUser] = useState({});
  useEffect(() => {
    axiosPost({
      url: "individuals/getIndividualDetails",
      data: { userName: Cookies.get("userName") },
    }).then((response) => {
      setUser(response.data);
      form.setFieldsValue(response.data);
    });
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const {
      firstName,
      lastName,
      phone,
      countryPhoneCode,
      gender,
      userName,
      email,
    } = values;

    const payload = {
      firstName,
      lastName,
      phone,
      countryPhoneCode,
      gender,
      userName,
      email,
    };
    // axios call then below execution
    await axiosPost({
      url: "individuals/updateIndividualDetails",
      data: payload,
    });

    Cookies.set("firstName", firstName);
    message.success("Successfully updated profile", 4);
    setReadonly(true);
  };

  return (
    <div>
      <Form
        name="update-profile-form"
        form={form}
        requiredMark={false}
        layout="horizontal"
        labelAlign="left"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Row gutter={50}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item {...tailFormItemLayout} name="userName" label="Username">
              {readonly ? user.userName : <Input disabled />}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item {...tailFormItemLayout} name="email" label="E-mail">
              {readonly ? user.email : <Input disabled />}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={50}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              {...tailFormItemLayout}
              name="firstName"
              label="First name"
            >
              {readonly ? user.firstName : <Input />}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              {...tailFormItemLayout}
              name="lastName"
              label="Last name"
            >
              {readonly ? user.lastName : <Input />}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={50}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item {...tailFormItemLayout} name="phone" label="Phone">
              {readonly ? (
                `${user.countryPhoneCode}-${user.phone}`
              ) : (
                <Input
                  addonBefore={
                    <Form.Item name="countryPhoneCode" noStyle>
                      <Select
                        style={{ width: 70 }}
                        defaultValue={user.countryPhoneCode}
                      >
                        <Option value="+1">+1</Option>
                        <Option value="+91">+91</Option>
                      </Select>
                    </Form.Item>
                  }
                  style={{ width: "100%" }}
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item {...tailFormItemLayout} name="gender" label="Gender">
              {readonly ? (
                user.gender
              ) : (
                <Select
                  placeholder="select your gender"
                  defaultValue={user.gender}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Non-Binary">Non-Binary</Option>
                  <Option value="Prefer not to say">Prefer not to say</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        {!readonly && (
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => {
                setReadonly(true);
              }}
            >
              Cancel
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default UpdateProfile;
