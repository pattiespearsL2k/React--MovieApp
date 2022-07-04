import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType";
import { SELECT_DAY, SHOW_RAP_DAY } from "../actions/types/ShowRap";
import {TODAY} from "../../redux/actions/types/Day"


const stateDefault = {
    heThongRapChieu: [],
    rapDay: [],
    selectDay: new Date(TODAY).toLocaleDateString("en-GB"),

}
console.log(stateDefault.heThongRapID, 'heThongRapIDReducer');


export const QuanLyRapReducer = (state=stateDefault,action) =>{

    switch (action.type) {
      
        case SET_HE_THONG_RAP_CHIEU : {
            state.heThongRapChieu = action.heThongRapChieu;
            return {...state};
        }
        case SHOW_RAP_DAY: {
            state.rapDay = action.rapDay;
            return {...state};
        }
        case SELECT_DAY:
            state.selectDay = action.selectDay;
            return { ...state };
        default: return {...state}
            break;
    }
}