import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { history } from "../../../App";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../../redux/actions/LoadingActions";
import { layHeThongRapAction } from "../../../redux/actions/QuanLyRapActions";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";
import { quanLyRapService } from "../../../services/QuanLyRapService";

export default function ShowTime(props) {
  const dispatch = useDispatch();
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
        history.push("/manager");
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
    rapID: {},
  });
  const [errDay, setErrDay] = useState("");
  const [errTime, setErrTime] = useState("");
  const { thongTinCumRap } = useSelector((state) => state.QuanLyRapReducer);
  console.log(thongTinCumRap);
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinCumRapTheoHeThongManager();
      console.log("result", result);
      setState({
        ...state,
        rapID: result,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch(layHeThongRapAction());
  }, []);

  // const rapData = useSelector(
  //   (state) => state.QuanLyRapReducer.heThongRapAdmin
  // );
  // console.log(rapData, "rapData");

  const handleChangeCumRap = (value) => {
    console.log(value);
    setState({
      ...state,
      cumRapId: value,
    });
  };

  const onChangeDate = (values) => {
    formik.setFieldValue("showday", moment(values).format("DD/MM/YYYY"));
  };
  const handleChangeRapcon = (label) => {
    formik.setFieldValue("roomID", label);
  };

  const convertSelectRapcon = () => {
    let arrayRap = [];
    state.rapID.data?.forEach((item) => {
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
    console.log(values, "values");
    var nowDate = new Date().toLocaleDateString("en-GB");
    var nowTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    values.showtime = dayjs(values.showtime).format("HH:mm:ss");
    values.showday = dayjs(values.showday).format("DD/MM/YYYY");
    if (values.showday < nowDate) {
      setErrDay("Ngày chiếu nên lớn hơn ngày hiện tại");
    }
    if (values.showday === nowDate) {
      if (values.showtime < nowTime) {
        setErrTime("Giờ chiếu nên lớn hơn giờ hiện tại");
      } else {
        setErrTime("");
      }
    }
    let newValue = {
      ...values,
      movieId: props.match.params.id,
    };

    dispatch(displayLoadingAction);
    try {
      let result = await quanLyDatVeService.taoLichChieu(newValue);
      message.success("Tạo lịch chiếu thành công");
      history.push("/manager");
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
            name="cumRap"
            label="Cụm rạp"
            rules={[{ required: true, message: "Cụm rạp không được để trống" }]}
          >
            <Select
              options={state.rapID.data?.map((cumRap) => ({
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
            rules={[{ required: true, message: "Rạp con không được để trống" }]}
          >
            <Select
              options={convertSelectRapcon()}
              onChange={handleChangeRapcon}
              placeholder="Chọn rạp con"
            />
          </Form.Item>
          <Form.Item
            name="showday"
            label="Ngày chiếu"
            rules={[
              { required: true, message: "Ngày chiếu không được để trống" },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" showday onChange={onChangeDate} />
          </Form.Item>
          <p style={{ color: "red", textAlign: "left" }}>{errDay}</p>

          <Form.Item
            name="showtime"
            label="Giờ chiếu"
            rules={[
              { required: true, message: "Giớ chiếu không được để trống" },
            ]}
          >
            <TimePicker format="hh:mm:ss" showtime />
          </Form.Item>
          <p style={{ color: "red", textAlign: "left" }}>{errTime}</p>
          <Form.Item
            label="Giá vé"
            name="price"
            rules={[{ required: true, message: "Giá vé không được để trống" }]}
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
