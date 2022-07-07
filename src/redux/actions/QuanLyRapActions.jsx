import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "./types/QuanLyRapType";
import {
  SHOW_RAP,
  SHOW_RAP_DAY,
  SHOW_RAP_DAY_CINEMA,
  SHOW_RAP_ID,
} from "./types/ShowRap";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { message } from "antd";
export const layDanhSachHeThongRapAction = () => {
  console.log("abc");
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      console.log("result", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      //Lấy được dữ liệu từ api về  => reducer

      dispatch({
        type: SET_CHI_TIET_PHIM,
        filmDetail: result.data,
      });
      dispatch(hideLoadingAction);
    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log("errors", errors.response?.data);
    }
  };
};

export const layHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      console.log("result", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: SHOW_RAP,
          heThongRapAdmin: result.data,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinHeThongRapByUserIDAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRapByUserID();
      console.log("result", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: SHOW_RAP_ID,
          heThongRapID: result.data,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};



export const xoaLichChieuAction = (showID) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await quanLyRapService.xoaLichChieu(showID);
      console.log("result", result.data);
      message.success("Xóa lịch chiếu thành công");
      //Sau khi xoá load lại danh sách phim mới;
      // dispatch(layDanhSachPhimAction())
    } catch (errors) {
      message.success("Xóa lịch chiếu không thành công");
      console.log("errors", errors.response?.data);
    }
  };
};
