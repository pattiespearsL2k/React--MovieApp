import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
    DANG_XUAT_ACTION, DANG_KY_ACTION, DANG_NHAP_ACTION,
    SET_THONG_TIN_NGUOI_DUNG, LAY_DS_ND, LAY_THONGTIN_TAIKHOAN
} from "../actions/types/QuanLyNguoiDungType"


let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    mangND: [],
    userLogin: user,
    thongTinNguoiDung: {},
    mangLoaiND: [],
    thongTinTK: {},

}


export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_KY_ACTION:
            state.thongTinDangKy = action.thongTinDangKy;
            return { ...state }


        case DANG_NHAP_ACTION: {
            // dispatch ở action nên qua reducer lấy ra
            const {thongTinDangNhap} = action;
            console.log(thongTinDangNhap,'thongTinDangNhap');
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }

        case DANG_XUAT_ACTION:
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem( TOKEN)
            state.userLogin = action.userLogin;
            return { ...state }

        case LAY_DS_ND:
            state.mangND = action.mangND;
            return { ...state };

        case LAY_THONGTIN_TAIKHOAN:
            state.thongTinTK = action.thongTinTK;
            return { ...state }

        default:
            return { ...state }
    }
}