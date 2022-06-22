import { baseService } from "./baseService";
// import { GROUPID} from '../util/settings/config'
export class QuanLyRapService  extends baseService{

    constructor() {
        super();
    }

    layDanhSachHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?movieId=${maPhim}`)
    }
    
    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRap = (cinemaID) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?cinemaID=${cinemaID}`);
    }
}



export const quanLyRapService = new QuanLyRapService();
