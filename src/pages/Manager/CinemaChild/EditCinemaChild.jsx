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
} from "@ant-design/icons"; //

import { useSelector } from "react-redux";
import {
  CapNhatCumRapAction,
  layThongTinChiTietCumRapAction,
} from "../../../redux/actions/QuanLyRapActions";

import styled from "styled-components";
import "../../../assets/style/addUser.css";

const EditCinemaChild = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const { thongTinCumRapChiTiet } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  console.log(thongTinCumRapChiTiet, "thongtin");
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    console.log(id);
    dispatch(layThongTinChiTietCumRapAction(id));
  }, []);

  let newData = thongTinCumRapChiTiet.listRoom
    ?.map((item) => item.roomName)
    .join(",  ");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cinemaChildID: thongTinCumRapChiTiet.cinemaChildID,
      cinemaChildName: thongTinCumRapChiTiet.cinemaChildName,
      address: thongTinCumRapChiTiet.address,
      listRoom: newData,
    },

    onSubmit: (values) => {
      console.log(values, "values");
      const action = CapNhatCumRapAction(values);
      console.log(action, "action");
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
        Cập nhật thông tin cụm rạp{" "}
        <span className="text-primary">
          {thongTinCumRapChiTiet.cinemaChildName}
        </span>{" "}
      </h3>

      <Form.Item label="Tên cụm rạp" className="mt-4">
        <Input
          name="cinemaChildName"
          value={formik.values.cinemaChildName}
          onChange={formik.handleChange}
          prefix={<UserAddOutlined />}
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        rules={[
          {
            required: true,
            message: "Họ Tên không được để trống",
          },
        ]}
        hasFeedback
      >
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          allowClear
        />
      </Form.Item>

      <Form.Item label="Rạp con" name={["listRoom", "roomName"]}>
        <Input
          name={["listRoom", "roomName"]}
          value={formik.values.listRoom}
          allowClear
          prefix={<MailOutlined />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
        {formik.touched.listRoom && formik.errors.listRoom ? (
          <div className="alert alert-danger">{formik.errors.listRoom}</div>
        ) : null}
      </Form.Item>
      <Form.Item>
        <button type="submit" className="btn-active-add-after">
          Cập nhật cụm rạp
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
export default EditCinemaChild;
