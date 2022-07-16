import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { message } from "antd";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { history } from "../../App";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
  SET_THONG_TIN_CHI_TIET_VE,
} from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (showID) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(showID);
      console.log("result chi tiết pv", result);
      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const layThongTinChiTietVeAction = (couponID) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      const result = await quanLyDatVeService.layThongTinChiTietVe(couponID);
      // console.log("thông tin chi tiết vé", result);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_CHI_TIET_VE,
          chiTietVe: result.data,
        });
      }
      dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch(displayLoadingAction);
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      console.log(result.data, "result dat ve");
      // Đặt vé thành công gọi api load lại phòng vé

      await dispatch(hideLoadingAction);
      let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
      // connection.invoke('datGheThanhCong', userLogin.usename, thongTinDatVe.showID)
      dispatch({ type: CHUYEN_TAB });
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.showID));
      await dispatch({ type: DAT_VE_HOAN_TAT, datVeHoanTat: result.data });
      message.success("Đặt vé thành công");
      history.push(`/qr/${result.data.couponID}`);
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log(error.response.data);
    }
  };
};

export const datGheAction = (ghe, showID) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let username = getState().QuanLyNguoiDungReducer.userLogin.username;
    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", username);
    console.log("maLichChieu", showID);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    // connection.invoke('datGhe', username, danhSachGheDangDat, showID);
  };
};
