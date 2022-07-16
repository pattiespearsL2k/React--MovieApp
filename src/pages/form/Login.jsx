import { UserAddOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { validationSchema } from "../../helper/validHelper";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import "./Login.css";

export default function Login() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, handleLogin } =
    useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tài khoản không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      console.log(values, "values");
      dispatch(action);
    },
  });

  useEffect(() => {
    if (!!userLogin.username) {
      dispatch({
        type: "CLOSE_MODAL",
        isVisible: false,
      });
    }
    if (userLogin.role === "admin") {
      Modal.confirm({
        content: "Bạn có muốn chuyển đến trang admin không?",
        onOk() {
          history.push("/admin");
        },
      });
    }
    if (userLogin.role === "quantri") {
      Modal.confirm({
        content: "Bạn có muốn chuyển đến trang quản trị không?",
        onOk() {
          history.push("/manager");
        },
      });
    }
    if (userLogin.role === "khachhang") {
      history.push("/");
    }
  }, [userLogin]);

  return (
    <div>
      <Form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
          console.log(e.target.value, "e.target");
        }}
      >
        <div className="form-container-login">
          <h3>Đăng nhập</h3>
          <label htmlFor="username">Tài khoản</label>
          <Form.Control
            prefix={<UserAddOutlined />}
            allowClear
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="username"
            className="form-control"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="alert alert-danger">{formik.errors.username}</div>
          ) : null}
          <label htmlFor="password">Mật khẩu</label>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            className="form-control"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          <div className="login__btn">
            <Form.Control type="submit" value=" Đăng nhập" />
          </div>
          <div className="no-acc">
            Bạn chưa có tài khoản?
            <a href="" onClick={showModal}>
              {" "}
              Đăng ký
            </a>
          </div>
        </div>
      </Form>
    </div>
  );
}
