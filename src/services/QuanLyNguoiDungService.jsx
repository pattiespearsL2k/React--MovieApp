import { baseService } from "./baseService";
// import { GROUPID } from '../util/settings/config'
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

    layDanhSachNguoiDung = (username) => {
        if (username) {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?textSearch=${username}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`)
    };

    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    themNguoiDung = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData)
    }

    capNhatThongTinNguoiDung = (formData) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
    };

    xoaND = (username) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?username=${username}`)
    };

    layThongTinTaiKhoan = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    };




}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
