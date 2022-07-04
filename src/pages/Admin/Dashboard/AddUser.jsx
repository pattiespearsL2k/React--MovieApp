import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import '../../../assets/style/addUser.css'
import styled from 'styled-components';

const { Option } = Select;
const AddUser = () => {
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch();
  const { mangND } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log(mangND)
  const userName = mangND?.map((value, index) => {
    return value.username
  })
  const userMail = mangND?.map((value, index) => {
    return value.email
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      email: '',
      phoneNumber: '',
      roleId: '3',
      password: '',

    },
    validationSchema: Yup.object({
      username: Yup.string().trim('Tài khoản không được để trống')
        .required('Tài khoản không được để trống')
        .notOneOf(userName, 'Tài khoản bị trùng '),
      email: Yup.string()
        .email('Email không đúng định dạng')
        .trim('Email không được để trống')
        .required('Email không được để trống')
        .notOneOf(userMail, 'Email bị trùng '),

    }),
    onSubmit: values => {
      const action = themNguoiDungAction(values);
      console.log(values)
      dispatch(action);
    },
  })
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form className='add-user-form'
      onSubmitCapture={formik.handleSubmit}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}>
      <h3>Thêm người dùng mới</h3>

      <Form.Item label="Tài Khoản" className='mt-4'
        rules={[
          {
            required: true,
            message: 'Họ Tên không được để trống',
          },
          {
            whitespace: true,
            message: 'Họ Tên không được để trống',
          }
        ]}
      >
        <Input name='username' prefix={<UserAddOutlined />} allowClear
          onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.username && formik.errors.username
          ? (<div className='alert alert-danger'>{formik.errors.username}</div>)
          : null}
      </Form.Item>
      <Form.Item label="Họ Tên" name='name' onChange={formik.handleChange}
        rules={[
          {
            required: true,
            message: 'Họ Tên không được để trống',
          },
          {
            whitespace: true,
            message: 'Họ Tên không được để trống',
          },
          {
            min: 3,
            message: 'Họ Tên có ít nhất 3 kí tự',
          }
        ]}
        hasFeedback >
        <Input name='name' allowClear prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item label="Email">
        <Input name='email' allowClear prefix={<MailOutlined />} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.email && formik.errors.email
          ? (<div className='alert alert-danger'>{formik.errors.email}</div>)
          : null}
      </Form.Item>
      <Form.Item label="Số điện thoại" name='phoneNumber' onChange={formik.handleChange} rules={[
        {
          required: true,
          message: 'Số điện thoại được để trống',
        },
        {
          whitespace: true,
          message: 'Số điện thoại được để trống',
        },
        {
          min: 10,
          message: 'Số điện thoại có ít nhất 10 kí tự',
        }
      ]}
        hasFeedback >
        <Input name='phoneNumber' maxLength={11} allowClear prefix={<PhoneOutlined />} />
      </Form.Item>
      <Form.Item label="Mật Khẩu" name='password' onChange={formik.handleChange}
        rules={[
          {
            required: true,
            message: 'Mật khẩukhông được để trống',
            // autoComplete:'off'
          },
          {
            whitespace: true,
            message: 'Mật khẩu không được để trống',
          },
          {
            min: 6,
            message: 'Mật khẩu ít nhất 6 kí tự',
          }
        ]}
        hasFeedback>
        <Input.Password name='password' type='password' allowClear prefix={< LockOutlined />} />
      </Form.Item>
      <Form.Item label="Nhập lại Mật Khẩu" onChange={formik.handleChange} name='comfirmPassword'
        rules={[
          {
            required: true,
            message: 'Mật khẩu không được để trống',
          },
          {
            whitespace: true,
            message: 'Mật khẩu không được để trống'
          },
          {
            min: 6,
            message: 'Mật khẩu ít nhất 6 kí tự'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Mật khẩu không trùng')
            }
          })
        ]}
        hasFeedback>
        <Input.Password name='password' type='password' allowClear prefix={< LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <button type="submit" className="btn-active-add-after">Thêm người dùng</button>
      </Form.Item>
    </Form>
  );
};
const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`
export default AddUser