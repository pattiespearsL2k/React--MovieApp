import { baseService } from "./baseService";
// import { GROUPID} from '../util/settings/config'
export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layDanhSachHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
  };

  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?movieId=${maPhim}`
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
  layThongTinHeThongRapByUserID = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRapByUserID`);
  };
  layThongTinLichChieuHeThongRapTheoNgay = (day) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRapTheoNgay?showday=${day}`
    );
  };
  xoaLichChieu = (showID) => {
    return this.delete(`/api/QuanLyDatVe/XoaLichChieu?showID=${showID}`);
  };
  layThongTinLichChieuTheoNgayVaRap = (showday) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRapTheoNgayVaTheoRap?showday=${showday}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
