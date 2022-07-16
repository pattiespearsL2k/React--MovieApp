import { baseService } from "./baseService";
// import { GROUPID} from '../util/settings/config'
export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layDanhSachHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
  };

  layThongTinLichChieuPhim = (maPhim, showday) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?movieId=${maPhim}&showday=${showday}`
    );
  };

  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  layThongTinCumRap = (cinemaID) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaID}`
    );
  };

  layThongTinCumRapTheoHeThongManager = () => {
    return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong`);
  };

  layThongTinLichChieuHeThongRapTheoNgay = (day) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRapTheoNgay?showday=${day}`
    );
  };

  xoaLichChieu = (showID) => {
    return this.delete(`/api/QuanLyDatVe/XoaLichChieu?showID=${showID}`);
  };

  layThongTinLichChieuTheoNgayVaRap = (showday, movieId) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRapTheoNgayVaTheoRap?showday=${showday}&movieId=${movieId}`
    );
  };

  themHeThongRap = (formData) => {
    return this.post(`/api/QuanLyRap/TaoHeThongRap`, formData);
  };

  capNhatHeThongRap = (formData) => {
    return this.put(`/api/QuanLyRap/CapNhatThongTinHeThong`, formData);
  };

  layThongTinChiTietHeThongRap = (cinemaID) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinChiTietHeThongRap?cinemaID=${cinemaID}`
    );
  };

  xoaHeThongRap = (cinemaID) => {
    return this.delete(`/api/QuanLyRap/XoaHeThongRap?cinemaID=${cinemaID}`);
  };

  xoaCumRap = (cinemaChildID) => {
    return this.delete(
      `/api/QuanLyRap/XoaCumRap?cinemaChildID=${cinemaChildID}`
    );
  };

  themCumRap = (cinemaChild) => {
    return this.post(`/api/QuanLyRap/ThemCumRap`, cinemaChild);
  };

  layThongTinChiTietCumRap = (cinemaChildID) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinChiTietCumRap?cinemaChildID=${cinemaChildID}`
    );
  };

  capNhatCumRap = (cinemaChild) => {
    return this.put(`/api/QuanLyRap/CapNhatCumRap`, cinemaChild);
  };
}

export const quanLyRapService = new QuanLyRapService();
