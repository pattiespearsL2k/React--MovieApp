import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import {
    LAY_DS_ND, DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_XUAT_ACTION,
    SET_THONG_TIN_NGUOI_DUNG, LAY_THONGTIN_TAIKHOAN, SET_THONG_TIN_KH
} from "./types/QuanLyNguoiDungType";
import { history } from '../../App';
import { message } from "antd"


export const LogoutAction = () => {
    return {
        type: DANG_XUAT_ACTION,
        userLogin: {}
    }
}
export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
            message.success('Đăng ký thành công!');
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            console.log(result, 'result');
            if (result.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data
                });
                message.success('Đăng nhập thành công!');
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
        } catch (error) {
            message.error('Tài khoản hoặc mật khẩu sai!')
            console.log('error', error.response.data);
        }
    }
}


export const layDanhSachNDAction = (username = '') => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.layDanhSachNguoiDung(username);
            console.log("result", result.data)
            dispatch({
                type: LAY_DS_ND,
                mangND: result.data
            })
        } catch (err) {
            console.log('err', err);
        }
    }
}


export const xoaNDAction = (username) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.xoaND(username);
            message.success('Xoá tài khoản thành công')
            dispatch(layDanhSachNDAction())
        } catch (err) {
            console.log('err', err);
        }
    }

}


export const themNguoiDungAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.themNguoiDung(formData);
            console.log("result", result)
            message.success('Thêm người dùng thành công')
            history.push('/admin')
        } catch (err) {
            console.log('err', err);

        }
    }
}
export const layThongTinKHAction = (username) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.layThongTinKH(username);
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_KH,
                    thongTinKH: result.data
                });
            }
        } catch (err) {
            console.log('err', err);
        }
    }

}

export const layThongTinNguoiDungAction = () => {

    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            // console.log("result", result)
            if (result.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data
                });
            }

            // console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}


export const CapNhatThongTinNguoiDungAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formData);
            console.log("result update", result);
            message.success('Cập nhật người dùng thành công')
            history.push('/admin')
            // dispatch(layDanhSachNDAction())
        } catch (err) {
            console.log('err', err);
        }
    }
}


export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.layThongTinTaiKhoan();
            dispatch({
                type: LAY_THONGTIN_TAIKHOAN,
                thongTinTK: result.data
            })

        } catch (err) {
            console.log('err', err);
        }
    }
}
