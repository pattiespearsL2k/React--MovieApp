import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { LAY_DS_ND, DANG_KY_ACTION, DANG_NHAP_ACTION, DANG_XUAT_ACTION,
    SET_THONG_TIN_NGUOI_DUNG, LAY_THONGTIN_TAIKHOAN } from "./types/QuanLyNguoiDungType";
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
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
            console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }

            console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}


export const layDanhSachNDAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
            dispatch({
                type: LAY_DS_ND,
                mangND: result.data.content
            })
        } catch (err) {
            console.log('err', err);
        }
    }
}


export const xoaNDAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.xoaND(taiKhoan);
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
            message.success('Thêm người dùng thành công')
            history.push('/admin')
        } catch (err) {
            console.log('err', err);

        }
    }
}


export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
            console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    }
}


export const CapNhatThongTinNguoiDungAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formData);
            message.success('Cập nhật người dùng thành công')
            history.push('/admin')
            dispatch(layDanhSachNDAction())
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
                thongTinTK: result.data.content
            })

        } catch (err) {
            console.log('err', err);
        }
    }
}
