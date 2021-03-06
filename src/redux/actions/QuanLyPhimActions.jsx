import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from '../../App'
import { message} from 'antd';
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";


export const layDanhSachPhimAction = (title = '') => {

    return async (dispatch) => {
     
        try {
            const result = await quanLyPhimService.layDanhSachPhim(title);
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arf: result.data
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}

export const layThongTinPhimAction = (movieId) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(movieId);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}


export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            message.success("Thêm phim thành công")
            history.push('/admin/films')
            dispatch(hideLoadingAction)

        } catch (errors) {
            dispatch(hideLoadingAction)
            console.log("er", errors.response?.data)
        }
    }
}


export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            message.success('Cập nhật phim thành công!')
            console.log('result', result.data);
            dispatch(hideLoadingAction)
            history.push('/admin/films');
        } catch (errors) {
            dispatch(hideLoadingAction)
            console.log(errors.response?.data)
        }
    }
}



export const xoaPhimAction = (movieId) => {
    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.xoaPhim(movieId);
            console.log('result', result.data);
            message.success("Xóa phim thành công");
            //Sau khi xoá load lại danh sách phim mới;
            dispatch(layDanhSachPhimAction())
        } catch (errors) {
            message.success("Xóa phim không thành công");
            console.log('errors', errors.response?.data)
        }
    }
}