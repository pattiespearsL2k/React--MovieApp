import { baseService } from "./baseService";
export class QuanLyPhimService extends baseService {

    constructor() {
        super();
    }

    layDanhSachPhim = (title = '') => {
        if (title.trim() != '') {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?title=${title}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim`)
    }

    themPhimUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }

    layThongTinPhim = (movieId) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?movieId=${movieId}`)
    }

    capNhatPhimUpload = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhim`, formData);
    }


    xoaPhim = (movieId) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?movieId=${movieId}`);
    }
}



export const quanLyPhimService = new QuanLyPhimService();
