import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
  SET_THONG_TIN_CHI_TIET_VE,
} from "../actions/types/QuanLyDatVeType";
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [], //danh sách ghế đang đặt
  danhSachGheKhachDat: [],
  // [{maGhe:48041},{maGhe:48042}],
  tabActive: "1",
  chiTietVe: {},
  datVeHoanTat: {},
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }

    case DAT_VE: {
      //Cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];

      // Nếu đã tồn tại trong mảng được chọn, ghế đã chọn r, click lại => xóa khỏi mảng
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.chairID === action.gheDuocChon.chairID
      );
      if (index != -1) {
        //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      state.datVeHoanTat = action.datVeHoanTat;
      return { ...state };
    }

    case CHUYEN_TAB: {
      state.tabActive = "2";
      return { ...state };
    }

    case "CHANGE_TAB_ACTIVE": {
      console.log("action", action);
      state.tabActive = action.number;
      return { ...state };
    }

    case "DAT_GHE": {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }

    case "GET_THONG_TIN_DAT_VE": {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }

    case SET_THONG_TIN_CHI_TIET_VE: {
      state.chiTietVe = action.chiTietVe;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
