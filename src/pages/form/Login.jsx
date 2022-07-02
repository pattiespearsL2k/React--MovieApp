import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Modal } from 'antd';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../App';
import "./Login.css"
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../helper/validHelper";
import { NavLink } from "react-router-dom";
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Redirect } from "react-router";
import Register from './Register';


export default function Login() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

   
    // const showRegister = () => {
    //     setTitle("Register");
    //     dispatch({
    //         type: 'OPEN_MODAL',
    //         Component: <Register />,
    //         isVisible: true,
    //     })
    // };



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, handleLogin } = useForm(formOptions);
    const { errors } = formState;



    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log("userLogin", userLogin);


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Tài khoản không được để trống'),
            password: Yup.string().required("Mật khẩu không được để trống")
        }),
        onSubmit: values => {
            const action = dangNhapAction(values);
            console.log(values, 'values');
            dispatch(action);

        }
    })

    useEffect(() => {
        if (!!userLogin.username) {
            dispatch({
                type: 'CLOSE_MODAL',
                isVisible: false,
            })
        };
        if (userLogin.role === 'admin') {
            alert('Bạn là thành viên của Quản trị viên, trình duyệt sẽ chuyển sang trang quản trị')
            history.push("/admin/dashboard")
        }
        if (userLogin.role === 'quantri') {
            alert('Bạn là thành viên của Quản trị rạp, trình duyệt sẽ chuyển sang trang quản trị')
            history.push("/manager")
        }

    }, [userLogin])



    return (
        <div>
            <Form className="login" onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
                console.log(e.target.value, 'e.target');


            }}>
                {/* <div id="container-fluid"
                className={classNames('login-form container-fluid', { 'right-panel-active': isContainerActive })}
            >
                <div className="form-container sign-in-container">
                    <h1>Đăng nhập</h1>
                    <Form.Control onChange={formik.handleChange} placeholder="Tài khoản" onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                    {formik.touched.username && formik.errors.username ? (
                        <div className='alert alert-danger'>{formik.errors.username}</div>
                    ) : null}
                    <Form.Control onChange={formik.handleChange} placeholder="Mật khẩu" onBlur={formik.handleBlur} type="password" name='password' className="form-control" />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='alert alert-danger'>{formik.errors.password}</div>
                    ) : null}
                    <div className="login__btn">
                        <Form.Control type="submit" value=" Đăng nhập" />
                    </div>
                </div>
            </div> */}
                <div className="form-container-login">
                    <h3>Đăng nhập</h3>
                    <label for="username">Tài khoản</label>
                    <Form.Control prefix={<UserAddOutlined />} allowClear onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                    {formik.touched.username && formik.errors.username ? (
                        <div className='alert alert-danger'>{formik.errors.username}</div>
                    ) : null}
                    <label for="password">Mật khẩu</label>
                    <Form.Control onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='password' className="form-control" />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='alert alert-danger'>{formik.errors.password}</div>
                    ) : null}
                    <div className="login__btn">
                        <Form.Control type="submit" value=" Đăng nhập" />
                    </div>
                    <div className="no-acc">
                        Bạn chưa có tài khoản?
                        <a href="" onClick={showModal}> Đăng ký</a>
                    </div>

                </div>
            </Form>
            {/* <Modal
                title={title}
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {Component}
            </Modal> */}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <Register/>
            </Modal>
        </div>
    )
}


