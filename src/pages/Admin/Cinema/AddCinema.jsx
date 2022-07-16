import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { themHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";

const AddCinema = () => {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  console.log("hệ thống rạp", heThongRapChieu);
  const cinemaid = heThongRapChieu?.map((value, index) => {
    return value.cinemaID;
  });
  console.log(cinemaid);

  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      cinemaID: "",
      name: "",
      logo: {},
      aliases: "",
    },
    validationSchema: Yup.object({
      cinemaID: Yup.string()
        .trim("Mã rạp không được để trống")
        .required("Mã rạp không được để trống")
        .notOneOf(cinemaid, "Mã rạp trùng "),
        name: Yup.string()
        .trim("Tên rạp không được để trống")
        .required("Tên rạp không được để trống"),
        aliases: Yup.string()
        .trim("Bí danh không được để trống")
        .required("Bí không được để trống")
    
    }),
    onSubmit: (values) => {
      console.log("values", values);
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
        console.log(formData);
      }
      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(themHeThongRapAction(formData));
    },
  });

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("logo", file);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        className="AddNew"
        onSubmitCapture={formik.handleSubmit}
        layout="horizontal"
      >
        <h3 style={{ textAlign: "center" }}>Thêm mới hệ thống rạp </h3>
        <div className="form-flex-display">
          <Form.Item label="Mã rạp" 
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="cinemaID"
            onChange={formik.handleChange}>
            <Input name="cinemaID" onChange={formik.handleChange} />
            {formik.touched.cinemaID && formik.errors.cinemaID ? (
              <div className="alert alert-danger">{formik.errors.cinemaID}</div>
            ) : null}
          </Form.Item>
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
            <Input name="name" onChange={formik.handleChange} />
            {formik.touched.cinemaID && formik.errors.cinemaID ? (
              <div className="alert alert-danger">{formik.errors.cinemaID}</div>
            ) : null}
          </Form.Item>
        </div>
        <div className="form-flex-display">
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
            <Input name="aliases" onChange={formik.handleChange} />
            {formik.touched.cinemaID && formik.errors.cinemaID ? (
              <div className="alert alert-danger">{formik.errors.cinemaID}</div>
            ) : null}
          </Form.Item>
        </div>
        <Form.Item
          label="Hình ảnh"
          name="logo"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          onChange={handleChangeFile}
        >
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="btn-active-add-after">
            Thêm hệ thống rạp
          </button>
        </div>
      </Form>
    </>
  );
};

export default AddCinema;
