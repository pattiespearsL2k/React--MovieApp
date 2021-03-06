import { baseService } from "./baseService";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }

  layChiTietPhongVe = (showID) => {
    // mã lịch chiếu lấy từ url
    return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?showID=${showID}`);
  };

  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };

  taoLichChieu = (thongTinLichChieu) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
  };
  layThongTinChiTietVe = (couponID) => {
    return this.get(
      `/api/QuanLyDatVe/LayThongTinChiTietVe?couponID=${couponID}`
    );
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
