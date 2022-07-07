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
      email: Yup.string()
        .email("Email không đúng định dạng")
        .trim("Email không được để trống")
        .required("Email không được để trống")
        .notOneOf(userMail, "Email bị trùng trong mã nhóm GP03"),
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
    >
      <h3>
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
            message: "Họ Tên không được để trống",
          },
          {
            whitespace: true,
            message: "Họ Tên không được để trống",
          },
          {
            min: 3,
            message: "Họ Tên có ít nhất 3 kí tự",
          },
        ]}
        hasFeedback
      >
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          allowClear
          prefix={<UserOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        rules={[
          {
            required: true,
            message: "Email không được để trống",
          },
          {
            type: "email",
            message: "Email không đúng định dạng",
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
          {
            whitespace: true,
            message: "Số điện thoại được để trống",
          },
          {
            min: 10,
            message: "Số điện thoại có ít nhất 10 kí tự",
          },
        ]}
        hasFeedback
      >
        <Input
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          allowClear
          prefix={<PhoneOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <button type="submit" className="btn-active-add-after">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};
const ButtonStyled = styled(Button)`
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
`;
export default EditUser;
