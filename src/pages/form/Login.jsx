import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
// import { GROUPID } from '../../util/setting';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../App';
import "./Login.css"
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../helper/validHelper";
import { Redirect } from "react-router";


export default function Login() {
    const [isContainerActive, setIsContainerActive] = useState(false);
    const SignUp = () => {
        setIsContainerActive(true);
        console.log("hi")
    }
    const SignIn = () => {
        setIsContainerActive(false);
    }


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

    }, [userLogin])



    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
            console.log(e.target.value, 'e.target');


        }}>
            <div id="container-fluid"
                className={classNames('login-form container-fluid', { 'right-panel-active': isContainerActive })}>
                <div className="form-container sign-up-container">
                    {/* <Form action="#" onSubmit={handleSubmit(onSubmit)} > */}
                    <h1>Sign Up</h1>
                    <div className="form-wrap">
                        <Form.Group className="form-flex">
                            <Form.Control name="name" type="text" placeholder="Name"  {...register('name')} className={`form-control inp ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="phone" placeholder="Phone" name="phone" {...register('phone')} className={`form-control inp ${errors.phone ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phone?.message}</div>
                        </Form.Group>
                    </div>
                    <Form.Control onChange={formik.handleChange} placeholder="Tài khoản" onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                    {formik.touched.username && formik.errors.username ? (
                        <div className='alert alert-danger'>{formik.errors.username}</div>
                    ) : null}
                    <Form.Control type="text" placeholder="Address" name="address" {...register('address')} className={`form-control inp ${errors.address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                    <Form.Group className='form-wrap1' >
                        <Form.Label>Gender:</Form.Label>
                        <Form.Label>
                            <input type="radio" value="option1" name="gender" checked={true} />
                            Male
                        </Form.Label>
                        <Form.Label>
                            <input type="radio" value="option1" name="gender" />
                            Female
                        </Form.Label>
                    </Form.Group>
                    <div className='form-wrap'>
                        <Form.Group className="form-flex">
                            <Form.Control type="password" placeholder="Password" name="password" {...register('password')} className={`form-control inp ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type="password" placeholder="Confirm password" name="cfpassword" {...register('cfpassword')} className={`form-control inp ${errors.cfpassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.cfpassword?.message}</div>
                        </Form.Group>
                    </div>
                    <div className="login__btn">
                        <Form.Control type="submit" value=" Sign Up" />
                    </div>

                </div>
                <div className="form-container sign-in-container">

                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>or use your account</span>
                    <Form.Control onChange={formik.handleChange} placeholder="Tài khoản" onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                    {formik.touched.username && formik.errors.username ? (
                        <div className='alert alert-danger'>{formik.errors.username}</div>
                    ) : null}
                    <Form.Control onChange={formik.handleChange} placeholder="Mật khẩu" onBlur={formik.handleBlur} type="password" name='password' className="form-control" />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='alert alert-danger'>{formik.errors.password}</div>
                    ) : null}
                    <a href="#">Forgot your password?</a>
                    <div className="login__btn">
                        <Form.Control type="submit" value=" Sign In" />
                    </div>
                    {/* </Form> */}
                </div>
                <div className="overlay-container">
                    <div className="overlay-login">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <div className="login__btn ghost" id="signIn" onClick={SignIn}>
                                <Form.Control type="submit" value=" Sign In" />
                            </div>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello!</h1>
                            <p>Enter your personal details and start with us</p>
                            <div className="login__btn ghost" id="signUp" onClick={SignUp}>
                                <Form.Control type="submit" value=" Sign Up" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className="form-group">
                <label >Tài khoản</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                {formik.touched.username && formik.errors.username ? (
                    <div className='alert alert-danger'>{formik.errors.username}</div>
                ) : null}
            </div>
            <div className="form-group">
                <label>Mật khẩu</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='password' className="form-control" />
                {formik.touched.password && formik.errors.password ? (
                    <div className='alert alert-danger'>{formik.errors.password}</div>
                ) : null}
            </div>
            <ButtonStyled type="submit" className="btn">Đăng Nhập</ButtonStyled> */}
        </form>
    )
}


