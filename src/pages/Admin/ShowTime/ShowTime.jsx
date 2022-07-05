import React, { useEffect, useState } from "react";
import {
  Form,
  Cascader,
  TimePicker,
  DatePicker,
  InputNumber,
  Button,
  Input,
  Select,
  message,
} from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import { history } from "../../../App";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../../redux/actions/LoadingActions";
import { ListItemSecondaryAction } from "@material-ui/core";
import { uniqBy } from "lodash";
import { cloneDeep } from "lodash/cloneDeep";
import { layHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";
import dayjs from "dayjs";

export default function ShowTime(props) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const formik = useFormik({
    initialValues: {
      movieId: props.match.params.id,
      showday: "",
      showtime: "",
      roomID: "",
      price: "",
    },
    validationSchema: Yup.object({
      price: Yup.string()
        .required("Giá vé không được để trống")
        .matches(
          /-?[0-9]+[0-9]*/,
          "Nhập đúng định dạng giá từ 75000 đến 200000"
        ),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      dispatch(displayLoadingAction);
      try {
        let result = await quanLyDatVeService.taoLichChieu(values);
        message.success("Tạo lịch chiếu thành công");
        // history.push('/admin')
        dispatch(hideLoadingAction);
      } catch (err) {
        dispatch(hideLoadingAction);
        console.log("err", err.reponse?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
    cumRapId: "",
  });

  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch(layHeThongRapAction());
  }, []);

  const rapData = useSelector(
    (state) => state.QuanLyRapReducer.heThongRapAdmin
  );
  console.log(rapData, "rapData");

  const handleChangeHeThongRap = async (value) => {
    // console.log(value)
    // từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      console.log(result, "result");
      setState({
        ...state,
        cumRapChieu: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCumRap = (value) => {
    // formik.setFieldValue('roomID', value)
    console.log(value);
    setState({
      ...state,
      cumRapId: value,
    });
  };

  const handleChangeRapcon = (label) => {
    formik.setFieldValue("roomID", label);
  };

  const onChangeDate = (values) => {
    formik.setFieldValue("showday", moment(values).format("DD/MM/YYYY"));
  };

  const onChangeTime = (values) => {
    formik.setFieldValue("showtime", moment(values).format("hh:mm:ss"));
  };

  const convertSelecHRP = () => {
    return state.heThongRapChieu?.map((htr) => {
      return { label: htr.name, value: htr.cinemaID };
    });
  };

  const convertSelectRapcon = () => {
    let arrayRap = [];
    state.cumRapChieu.forEach((item) => {
      if (item.cinemaChildID === state.cumRapId) {
        arrayRap = Object.values(item.listRoom);
      }
    });

    return arrayRap.map((item) => {
      return { label: item.roomName, value: item.roomID };
    });
  };

  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  const onFinish = async (values) => {
    values.showtime = dayjs(values.showtime).format("HH:mm:ss");
    values.showday = dayjs(values.showday).format("DD/MM/YYYY");
    let newValue = {
      ...values,
      movieId: props.match.params.id,
    };

    dispatch(displayLoadingAction);
    try {
      let result = await quanLyDatVeService.taoLichChieu(newValue);
      message.success("Tạo lịch chiếu thành công");
      history.push("/admin");
      dispatch(hideLoadingAction);
    } catch (err) {
      dispatch(hideLoadingAction);
      console.log("err", err.reponse?.data);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      // onSubmitCapture={formik.handleSubmit}
      onFinish={onFinish}
    >
      <h3 className="">
        Tạo Lịch Chiếu - <span style={{ color: "purple" }}>{film.title}</span>
      </h3>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4} lg={5}>
          <img src={film.image} width={200} height={300} />
        </Grid>
        <Grid item xs={6} md={8} lg={7}>
          <Form.Item
            name="heThongRap"
            label="Hệ thống rạp"
            rules={[{ required: true, message: "dasd" }]}
          >
            <Select
              options={convertSelecHRP()}
              onChange={handleChangeHeThongRap}
              placeholder="Chọn hệ thống rạp"
            />
          </Form.Item>
          <Form.Item
            name="cumRap"
            label="Cụm rạp"
            rules={[{ required: true, message: "dasd" }]}
          >
            <Select
              options={state.cumRapChieu?.map((cumRap) => ({
                label: cumRap.cinemaChildName,
                value: cumRap.cinemaChildID,
              }))}
              onChange={handleChangeCumRap}
              placeholder="Chọn cụm rạp"
            />
          </Form.Item>
          <Form.Item
            name="roomID"
            label="Rạp con"
            rules={[{ required: true, message: "dasd" }]}
          >
            <Select
              options={convertSelectRapcon()}
              onChange={handleChangeRapcon}
              placeholder="Chọn rạp con"
            />
          </Form.Item>
          {/* <Form.Item label="Rạp con">
            <Select onChange={handleChangeRapcon}  placeholder='Chọn rạp con' >
              <Option value="741">1</Option>
            </Select>
          </Form.Item> */}
          <Form.Item
            name="showday"
            label="Ngày chiếu"
            rules={[{ required: true, message: "dasd" }]}
          >
            <DatePicker format="DD/MM/YYYY" showday onChange={onChangeDate} />
          </Form.Item>
          <Form.Item
            name="showtime"
            label="Giờ chiếu"
            rules={[{ required: true, message: "dasd" }]}
          >
            <TimePicker format="hh:mm:ss" showtime onChange={onChangeTime} />
          </Form.Item>
          <Form.Item
            label="Giá vé"
            name="price"
            rules={[{ required: true, message: "dasd" }]}
          >
            <InputNumber min={75000} max={200000} />
          </Form.Item>
          <Form.Item>
            <button
              type="primary"
              className="btn-active-add-after"
              htmlType="submit"
            >
              Tạo Lịch chiếu
            </button>
          </Form.Item>
        </Grid>
      </Grid>
    </Form>
  );

  const ButtonStyled = styled(Button)`
    color: #fff;
    border-color: #1890ff !important;
    background: #1890ff;
  `;
}
