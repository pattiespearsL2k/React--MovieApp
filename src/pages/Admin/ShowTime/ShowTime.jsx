import React, { useEffect, useState } from 'react';
import { Form, Cascader, DatePicker, InputNumber, Button, Select, message } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik'
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';
import styled from 'styled-components';

export default function ShowTime(props) {

  const formik = useFormik({
    initialValues: {
      movieId: props.match.params.id,
      showday: '',
      showtime:'',
      roomID: '',
      price: '',
    },
    onSubmit: async (values) => {
      try {
        let result = await quanLyDatVeService.taoLichChieu(values);
        message.success(result.data.content)
        history.push('/admin/films')
      } catch (err) {
        console.log('err', err.reponse?.data);
      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })


  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data
      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: result.data
      })
    } catch (error) {
      console.log("error", error.reponse?.data);
    }
  }

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('roomID', value)
  }
  // const onOk = (values) => {
  //   formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'))
  // }
  const onChangeDate = (values) => {
    formik.setFieldValue('showday', moment(values).format('DD/MM/YYYY'));
  }
  const onChangeInputNumber = (value) => {
    formik.setFieldValue('price', value)
  }
  const convertSelecHRP = () => {
    return state.heThongRapChieu?.map((htr) => {
      return { label: htr.name, value: htr.cinemaID}
    })
  }

  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className=''>Tạo Lịch Chiếu - <span style={{ color: "purple" }}>{film.title}</span></h3>
      <div className="row mt-4">
        <div className="col-2 text-right">
          <img src={film.image} width={200} height={300} />
        </div>
        <div className="col-8 text-left">
          <Form.Item label="Hệ thống rạp">
            <Select options={convertSelecHRP()} onChange={handleChangeHeThongRap} placeholder='Chọn hệ thống rạp' />
          </Form.Item>
          <Form.Item label="Cụm rạp">
            <Select options={state.cumRapChieu?.map(cumRap => ({
              label: cumRap.cinemaChildName, value: cumRap.cinemaChildID
            }))}
              onChange={handleChangeCumRap} placeholder='Chọn cụm rạp' />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <DatePicker format='DD/MM/YYYY' showday onChange={onChangeDate}  />
          </Form.Item>
          <Form.Item label="Giờ chiếu">
            <DatePicker format=' HH:mm:ss' showday onChange={onChangeDate}  />
          </Form.Item>
          <Form.Item label="Giá vé">
            <InputNumber onChange={onChangeInputNumber} />
          </Form.Item>
          <Form.Item label="Chức năng">
            <ButtonStyled type="primary" htmlType="submit">Tạo Lịch chiếu</ButtonStyled>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`