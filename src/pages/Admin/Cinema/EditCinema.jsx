import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatHeThongRapAction,
  layThongTinChiTietHeThongRapAction,
} from "../../../redux/actions/QuanLyRapActions";
import * as Yup from "yup";

const EditCinema = (props) => {
  const { thongTinRap } = useSelector((state) => state.QuanLyRapReducer);
  console.log(thongTinRap);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietHeThongRapAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cinemaID: thongTinRap.cinemaID,
      name: thongTinRap.name,
      aliases: thongTinRap.aliases,
      logo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("Tên rạp không được để trống")
        .required("Tên rạp không được để trống"),
      aliases: Yup.string()
        .trim("Bí danh không được để trống")
        .required("Bí không được để trống"),
    }),

    onSubmit: (values) => {
      console.log("values", values);
      values.releaseDate = moment(values.releaseDate).format("DD/MM/YYYY");
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "logo") {
          formData.append(key, values[key]);
        } else {
          if (values.logo !== null) {
            formData.append("File", values.logo, values.logo.name);
          }
        }
      }
      //Cập nhật phim upload hình
      dispatch(capNhatHeThongRapAction(formData));
    },
  });

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue("logo", file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
    }
  };

  return (
    <>
      <Form
        className="addnew"
        onSubmitCapture={formik.handleSubmit}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <h3 style={{ textAlign: "center" }}>Cập nhật hệ thống rạp </h3>
        <Form.Item
          label="Tên rạp"
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
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Item>
        <Form.Item
          label="Bí danh"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          name="aliases"
          onChange={formik.handleChange}
        >
          <Input
            name="aliases"
            onChange={formik.handleChange}
            value={formik.values.aliases}
          />
          {formik.touched.aliases && formik.errors.aliases ? (
            <div className="alert alert-danger">{formik.errors.aliases}</div>
          ) : null}
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          onChange={handleChangeFile}
          name="logo"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <input
            name="logo"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/jpg"
          />
          <br />
          <img
            width={50}
            height={50}
            src={imgSrc === "" ? thongTinRap.logo : imgSrc}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="btn-active-add-after">
            Cập nhật rạp
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditCinema;
