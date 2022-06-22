import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
// import { GROUPID } from '../../../util/settings/config';
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

import { CapNhatThongTinNguoiDungAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { useSelector } from 'react-redux';

import '../../../assets/style/addUser.css'
import styled from 'styled-components';


const EditUser = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const { thongTinND } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  const { mangND } = useSelector(state => state.QuanLyNguoiDungReducer);
  
  const userMail = mangND.map(value=>{return value.email}).filter(item => item !== thongTinND.email)

  useEffect(() => {
    let { taiKhoan } = props.match.params;
    dispatch(layThongTinNguoiDungAction(taiKhoan));
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinND.taiKhoan,
      hoTen: thongTinND.hoTen,
      email: thongTinND.email,
      soDT: thongTinND.soDT,
      matKhau: thongTinND.matKhau,
      maLoaiNguoiDung: thongTinND.maLoaiNguoiDung,
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email('Email không đúng định dạng').trim('Email không được để trống').required('Email không được để trống').notOneOf(userMail, 'Email bị trùng trong mã nhóm GP03'),
      
    }),
    onSubmit: values => {
      // values.maNhom = GROUPID
      const action = CapNhatThongTinNguoiDungAction(values);
      dispatch(action);
    },
  })

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (

    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Sửa thông tin tài khoản <span className='text-primary'>{thongTinND.taiKhoan}</span> </h3>

      <Form.Item label="Tài Khoản" className='mt-4'>
        <Input name='taiKhoan' disabled  value={formik.values.taiKhoan} prefix={<UserAddOutlined />} allowClear />
      </Form.Item>
      <Form.Item label="Họ Tên"
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
        <Input name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} allowClear prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item label="Mật Khẩu" 
        rules={[
          {
            required: true,
            message: 'Mật khẩukhông được để trống',
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
        <Input.Password name='matKhau' value={formik.values.matKhau} onChange={formik.handleChange} type='password' allowClear prefix={< LockOutlined />} />
      </Form.Item>
      <Form.Item label="Nhập lại Mật Khẩu"  
        rules={[
          {
            required: true,
            message: 'Mật khẩukhông được để trống',
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
              if (!value || getFieldValue('matKhau') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Mật khẩu không trùng')
            }
          })
        ]}
        hasFeedback>
        <Input.Password name='matKhau' value={formik.values.matKhau} onChange={formik.handleChange} type='password' allowClear prefix={< LockOutlined />} placeholder='Nhập lại Mật Khẩu' />
      </Form.Item>
      <Form.Item label="Email"
        rules={[
          {
            required: true,
            message: 'Email không được để trống',
          },
          {
            type: 'email',
            message: 'Email không đúng định dạng',
          },

        ]}
        hasFeedback>
        <Input name='email'value={formik.values.email} allowClear prefix={<MailOutlined />} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        { formik.touched.email && formik.errors.email 
        ? (<div className='alert alert-danger'>{formik.errors.email}</div>) 
        : null}
      </Form.Item>
      <Form.Item label="Số điện thoại"
        rules={[
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
        <Input name='soDT' value={formik.values.soDT} onChange={formik.handleChange}  allowClear prefix={<PhoneOutlined />} />
      </Form.Item>
      <Form.Item label="Loại người dùng" onChange={formik.handleChange}
        rules={[
          {
            required: true,
            message: 'Bạn chưa chọn loại người dùng'
          }
        ]}
        hasFeedback>
        <Select name='maLoaiNguoiDung'
          onChange={(value) => {
            formik.setFieldValue("maLoaiNguoiDung", value)
          }} value={formik.values.maLoaiNguoiDung}>
          <Select.Option value='KhachHang'>Khách Hàng</Select.Option>
          <Select.Option value='QuanTri'>Quản Trị</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <ButtonStyled block htmlType='submit' type='primary' >Cập nhật người dùng</ButtonStyled>
      </Form.Item>
    </Form>
  );
};
const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff;
      background: #1890ff;
    
`
export default EditUser