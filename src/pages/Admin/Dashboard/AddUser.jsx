import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { themNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import "../../../assets/style/addUser.css";
import styled from "styled-components";

const { Option } = Select;
const AddUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { mangND } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(mangND);
  const userName = mangND?.map((value, index) => {
    return value.username;
  });
  const userMail = mangND?.map((value, index) => {
    return value.email;
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      phoneNumber: "",
      roleId: "3",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim("Tài khoản không được để trống")
        .required("Tài khoản không được để trống")
        .notOneOf(userName, "Tài khoản bị trùng "),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .trim("Email không được để trống")
        .required("Email không được để trống")
        .notOneOf(userMail, "Email bị trùng "),
      phoneNumber: Yup.string()
        .trim("Số điện thoại không được để trống")
        .required("Số điện thoại không được để trống"),
      name: Yup.string()
        .trim("Họ tên không được để trống")
        .required("Họ tên không được để trống"),
      password: Yup.string()
        .trim("Mật khẩu không được để trống")
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-12 kí tự")
        .max(12, "Mật khẩu phải từ 6-12 kí tự"),
    }),
    onSubmit: (values) => {
      const action = themNguoiDungAction(values);
      console.log(values);
      dispatch(action);
    },
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      className="add-user-form"
      onSubmitCapture={formik.handleSubmit}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 7 }}
    >
      <h3 style={{ textAlign: "center" }}>Thêm người dùng mới</h3>

      <Form.Item
        label="Tài Khoản"
        className="mt-4"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
        name="username"
        onChange={formik.handleChange}
      >
        <Input
          name="username"
          prefix={<UserAddOutlined />}
          allowClear
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="alert alert-danger">{formik.errors.username}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        label="Họ Tên"
        name="name"
        onChange={formik.handleChange}
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input name="name" allowClear prefix={<UserOutlined />} />
        {formik.touched.name && formik.errors.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
        name="email"
        onChange={formik.handleChange}
      >
        <Input
          name="email"
          allowClear
          prefix={<MailOutlined />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        onChange={formik.handleChange}
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input
          name="phoneNumber"
          maxLength={11}
          allowClear
          prefix={<PhoneOutlined />}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="alert alert-danger">{formik.errors.phoneNumber}</div>
        ) : null}
      </Form.Item>
       <Form.Item
        name="password"
        label="Mật khẩu"
        onChange={formik.handleChange}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Nhập lại mật khẩu"
        onChange={formik.handleChange}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Mật khẩu không trùng!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="primary"
          className="btn-active-add-after"
          htmlType="submit"
        >
          Thêm người dùng
        </button>
      </div>
    </Form>
  );
};
const ButtonStyled = styled(Button)`
  color: #fff;
  border-color: #1890ff !important;
  background: #1890ff;
`;
export default AddUser;
