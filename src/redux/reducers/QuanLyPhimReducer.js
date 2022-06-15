import { SET_DANH_SACH_PHIM, SET_FILM_SAP_CHIEU, SET_FILM_DANG_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";



const stateDefault = {
    arf: [
        {
            "title": "test",
            "description": "Ông Thái là một cảnh sát về hưu nhưng không chịu an phận thủ thường, hàng ngày vẫn đi tìm bắt tội phạm vặt trong xóm cho đỡ nhớ nghề. Một ngày kia, Hoàng - tên trùm ma túy mới ra tù bỗng dưng chuyển đến xóm ông và mở một văn phòng bất động sản. Nghi ngờ đây là nơi làm ăn phi pháp, ông Thái quyết định âm thầm điều tra. Ông mua lại tiệm cơm tấm đối diện trụ sở của Hoàng để làm nơi theo dõi, đồng thời thu nạp Thu - Phú - Vinh - Mèo, đám thanh niên “bất hảo” trong xóm về quán hỗ trợ buôn bán để rảnh tay \\\"phá án\\\". Trớ trêu thay, tiệm cơm bất ngờ nổi tiếng và ăn nên làm ra, khiến cho \\\"chuyên án đặc biệt\\\" của ông đứng trước nguy cơ đổ bể",
            "duration": 120,
            "language": "VietNam",
            "releaseDate": "2022-05-10T17:00:00.000Z",
            "country": "VietNam",
            "genre": "vui nhon",
            "image": "https://res.cloudinary.com/dbm5zec2j/image/upload/v1655185742/xx4pee8xmqrcf9hb1o4f.png",
            "trailer": "https://www.youtube.com/watch?v=1anBxcsV5b8",
            "rating": "10",
            "nowShowing": true,
            "comingSoon": false,
            "movieId": 6
        }
    ],
    nowShowing: true,
    comingSoon: true,
    arfDefault: [],
    filmDetail: {},
    thongTinPhim: {}

}
console.log(stateDefault.arf, 'arf reducer');

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_DANH_SACH_PHIM: {
            state.arf = action.arf;
            state.arfDefault = state.arf;
            return { ...state }
        }
        case SET_FILM_DANG_CHIEU: {
            state.nowShowing = !state.nowShowing;
            state.arf = state.arfDefault.filter(film => film.nowShowing === state.nowShowing);
            return { ...state }
        }
        case SET_FILM_SAP_CHIEU: {
            state.comingSoon = !state.comingSoon;
            state.arf = state.arfDefault.filter(film => film.comingSoon === state.comingSoon);
            return { ...state }
        }

        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail;
            return { ...state };
        }

        case SET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state }
        }

        default: return { ...state }
    }
}