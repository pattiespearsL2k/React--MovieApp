import { message } from "antd";
import { history } from "../../App";
import { quanLyRapService } from "../../services/QuanLyRapService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
  SET_THONG_TIN_RAP,
  SET_THONG_TIN_CUM_RAP,
  SET_THONG_TIN_CUM_RAP_CHI_TIET,
} from "./types/QuanLyRapType";
import { SHOW_RAP, SHOW_RAP_ID } from "./types/ShowRap";
export const layDanhSachHeThongRapAction = () => {
  console.log("abc");
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRap();
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

export const themHeThongRapAction = (formData) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      let result = await quanLyRapService.themHeThongRap(formData);
      message.success("Thêm hệ thống rạp thành công");
      history.push("/admin/cinema");
      dispatch(hideLoadingAction);
    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log("er", errors.response?.data);
    }
  };
};

export const layThongTinChiTietHeThongRapAction = (cinemaID) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinChiTietHeThongRap(
        cinemaID
      );
      dispatch({
        type: SET_THONG_TIN_RAP,
        thongTinRap: result.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const capNhatHeThongRapAction = (formData) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    try {
      let result = await quanLyRapService.capNhatHeThongRap(formData);
      message.success("Cập nhật rạp thành công!");
      console.log("result", result.data);
      dispatch(hideLoadingAction);
      history.push("/admin/cinema");
    } catch (errors) {
      dispatch(hideLoadingAction);
      console.log(errors.response?.data);
    }
  };
};

export const xoaHeThongRapAction = (cinemaID) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.xoaHeThongRap(cinemaID);
      console.log("result", result.data);
      message.success("Xóa hệ thống rạp thành công");
      dispatch(layDanhSachHeThongRapAction());
    } catch (errors) {
      message.success("Xóa hệ thống rạp không thành công");
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinCumRapTheoHeThongManagerAction = () => {
  console.log("result");

  return async (dispatch) => {
    try {
      const result =
        await quanLyRapService.layThongTinCumRapTheoHeThongManager();
      console.log(result, "result");
      dispatch({
        type: SET_THONG_TIN_CUM_RAP,
        thongTinCumRap: result.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaCumRapAction = (cinemaChildID) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.xoaCumRap(cinemaChildID);
      console.log("result", result.data);
      message.success("Xóa cụm rạp thành công");
      dispatch(layThongTinCumRapTheoHeThongManagerAction());
    } catch (errors) {
      message.success("Xóa cụm rạp không thành công");
      console.log("errors", errors.response?.data);
    }
  };
};

export const themCumRapAction = (cinemaChild) => {
  return async (dispatch) => {
    try {
      let result = await quanLyRapService.themCumRap(cinemaChild);
      console.log("result", result);
      message.success("Thêm cụm rạp thành công");
      history.push("/manager/cinemachild");
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const layThongTinChiTietCumRapAction = (cinemaChildID) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinChiTietCumRap(
        cinemaChildID
      );
      // console.log("result", result)
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_CUM_RAP_CHI_TIET,
          thongTinCumRapChiTiet: result.data,
        });
      }

      // console.log('result', result);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const CapNhatCumRapAction = (cinemaChild) => {
  return async (dispatch) => {
    try {
      console.log(cinemaChild, "cinemaChild");
      let result = await quanLyRapService.capNhatCumRap(cinemaChild);
      console.log("result update", result);
      message.success("Cập nhật cụm rạp thành công");
      history.push("/manager/cinemachild");
      dispatch(layThongTinCumRapTheoHeThongManagerAction());
    } catch (err) {
      console.log("err", err);
    }
  };
};
