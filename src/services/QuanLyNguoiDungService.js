import { baseService } from "./baseService";
import { GROUPID } from '../util/settings/config'
export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super();
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }
    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    layDanhSachNguoiDung = (tuKhoa) => {
        if (tuKhoa) {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`)
    };

    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    themNguoiDung = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData)
    }

    capNhatThongTinNguoiDung = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
    };

    xoaND = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    };

    layThongTinTaiKhoan = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    };




}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
