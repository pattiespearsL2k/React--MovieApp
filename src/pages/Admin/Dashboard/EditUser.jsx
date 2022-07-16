import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import {
  CapNhatThongTinNguoiDungAction,
  layThongTinKHAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";

import styled from "styled-components";
import "../../../assets/style/addUser.css";

const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinKH } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(thongTinKH);
  const dispatch = useDispatch();
  const { mangND } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const userMail = mangND
    .map((value) => {
      return value.email;
    })
    .filter((item) => item !== thongTinKH.email);

  useEffect(() => {
    let { username } = props.match.params;
    dispatch(layThongTinKHAction(username));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: thongTinKH.username,
      name: thongTinKH.name,
      email: thongTinKH.email,
      phoneNumber: thongTinKH.phoneNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("Họ tên không được để trống")
        .required("Họ tên không được để trống"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .trim("Email không được để trống")
        .required("Email không được để trống")
        .notOneOf(userMail, "Email bị trùng"),
      phoneNumber: Yup.string()
        .trim("Số điện thoại không được để trống")
        .required("Số điện thoại không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const action = CapNhatThongTinNguoiDungAction(values);
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
      <h3 style={{ textAlign: "center" }}>
        Sửa thông tin tài khoản{" "}
        <span className="text-primary">{thongTinKH.username}</span>{" "}
      </h3>

      <Form.Item label="Tài Khoản" className="mt-4">
        <Input
          name="username"
          disabled
          value={formik.values.username}
          prefix={<UserAddOutlined />}
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="Họ Tên"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
        name="name"
        onChange={formik.handleChange}
      >
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          allowClear
          prefix={<UserOutlined />}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
        ) : null}
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        onChange={formik.handleChange}
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input
          name="email"
          value={formik.values.email}
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
        rules={[
          {
            required: true,
            message: "Số điện thoại được để trống",
          },
        ]}
        hasFeedback
        name="phoneNumber"
        onChange={formik.handleChange}
      >
        <Input
          name="phoneNumber"
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          allowClear
          prefix={<PhoneOutlined />}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="alert alert-danger">{formik.errors.phoneNumber}</div>
        ) : null}
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit" className="btn-active-add-after">
          Cập nhật
        </button>
      </div>
    </Form>
  );
};
const ButtonStyled = styled(Button)`
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
`;
export default EditUser;
