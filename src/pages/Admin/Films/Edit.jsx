import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "../../../redux/actions/QuanLyPhimActions";
import * as Yup from "yup";

const Edit = (props) => {
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      movieId: thongTinPhim.movieId,
      nowShowing: thongTinPhim.nowShowing,
      comingSoon: thongTinPhim.comingSoon,
      rating: thongTinPhim.rating,
      title: thongTinPhim.title,
      trailer: thongTinPhim.trailer,
      description: thongTinPhim.description,
      releaseDate: thongTinPhim.releaseDate,
      image: null,
      duration: thongTinPhim.duration,
      country: thongTinPhim.country,
      genre: thongTinPhim.genre,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .trim("Tên phim không được để trống")
        .required("Tên phim không được để trống"),
      releaseDate: Yup.string()
        .trim("Ngày khởi chiếu không được để trống")
        .required("Ngày khởi chiếu không được để trống"),
    }),

    onSubmit: (values) => {
      console.log("values", values);
      values.releaseDate = moment(values.releaseDate).format("DD/MM/YYYY");
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          if (values.image !== null) {
            formData.append("File", values.image, values.image.name);
          }
        }
      }
      //Cập nhật phim upload hình
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let releaseDate = value;
    formik.setFieldValue("releaseDate", releaseDate);
    console.log(releaseDate);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

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
      await formik.setFieldValue("image", file);
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        className="addnew"
        onSubmitCapture={formik.handleSubmit}
        layout="horizontal"
      >
        <h3 style={{ textAlign: "center" }}>Cập nhật phim </h3>

        <Form.Item
          label="Tên phim"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          name="title"
          onChange={formik.handleChange}
        >
          <Input
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="alert alert-danger">{formik.errors.title}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>

        <Form.Item label="Thời gian">
          <Input
            name="duration"
            onChange={formik.handleChange}
            value={formik.values.duration}
          />
        </Form.Item>
        <Form.Item label="Quốc gia">
          <Input
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
          />
        </Form.Item>

        <Form.Item label="Thể loại">
          <Input
            name="genre"
            onChange={formik.handleChange}
            value={formik.values.genre}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <textarea
            style={{ width: "100%" }}
            rows={5}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Item>

        <Form.Item
          label="Ngày khởi chiếu"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          name="releaseDate"
          onChange={formik.handleChange}
        >
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePicker}
            value={moment(formik.values.releaseDate)}
          />
          {formik.touched.releaseDate && formik.errors.releaseDate ? (
            <div className="alert alert-danger">
              {formik.errors.releaseDate}
            </div>
          ) : null}
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            onChange={handleChangeSwitch("nowShowing")}
            checked={formik.values.nowShowing}
          />
        </Form.Item>

        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={handleChangeSwitch("comingSoon")}
            checked={formik.values.comingSoon}
          />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
          onChange={handleChangeFile}
          name="image"
        >
          <input
            name="image"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          <img
            width={50}
            height={50}
            src={imgSrc === "" ? thongTinPhim.image : imgSrc}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="btn-active-add-after">
            Cập nhật
          </button>
        </div>
      </Form>
    </>
  );
};

export default Edit;
