import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';
import { dangKyAction, layDanhSachNDAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Register() {

    const dispatch = useDispatch();
    const { thongTinDangKy } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        dispatch(layDanhSachNDAction());
    }, [])


    const { mangND } = useSelector(state => state.QuanLyNguoiDungReducer);
    const userName = mangND.map((value, index) => {
        return value.username
    })

    const userMail = mangND.map((value, index) => {
        return value.email
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            roleId: 3,
            name: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Tài khoản không được để trống')
                .notOneOf(userName, 'Tài khoản đã tồn tại'),
            password: Yup.string()
                .required("Mật khẩu không được để trống")
                .min(6, "Mật khẩu phải từ 6-12 ký tự")
                .max(12, 'Mật khẩu phải từ 6-12 ký tự'),
            email: Yup.string().
                required('Email không được để trống')
                .email('Email không đúng định dạng')
                .notOneOf(userMail, 'Email bị đã tồn tại'),
            phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
            name: Yup.string().required('Họ và tên không được để trống'),
        }),
        onSubmit: (values) => {
            console.log(values);
            const action = dangKyAction(values);
            dispatch(action);
            dispatch({
                type: 'CLOSE_MODAL',
                isVisible: false,
            });

        }
    })

    // useEffect(() => {
    //     if (!!thongTinDangKy.username) {
    //         console.log("xyz")
    //         dispatch({
    //             type: 'CLOSE_MODAL',
    //             isVisible: false,
    //         })
    //     }
    // }, [thongTinDangKy])

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
        }}>
            <div className='form-container-login'>
                <h3>Đăng ký</h3>
                <div className="form-group regi">
                    <label >Tài khoản</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='username' className="form-control" />
                    {formik.touched.username && formik.errors.username ? (
                        <div className='alert alert-danger'>{formik.errors.username}</div>
                    ) : null}

                </div>

                <div className="form-group regi">
                    <label>Email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' className="form-control" />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='alert alert-danger'>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group regi">
                    <label >Số điện thoại</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" name='phoneNumber' className="form-control" />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className='alert alert-danger'>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>
                <div className="form-group regi">
                    <label>Họ và tên</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='name' className="form-control" />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='alert alert-danger'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group regi">
                    <label>Mật khẩu</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='password' className="form-control" />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='alert alert-danger'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="login__btn">
                        <input className='btn-register' type="submit" value=" Đăng ký" />
                    </div>
            </div>

        </form>
    )
}

const ButtonStyled = styled.button`
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;

    &:hover {
        color: #fff;
        background-color: #0069d9;
    }
`