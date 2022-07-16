
import React, {useState} from "react";
import Film from "../Film/Film"
import Grid from '@mui/material/Grid';
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType'
import "./FilmList.css"
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";


const FilmList = (props) => {

  const dispatch = useDispatch();
  const { nowShowing, comingSoon, isAll } = useSelector(state => state.QuanLyPhimReducer);
  const [styleDang, setStyleDang] = useState(false);
  const [styleSap, setStyleSap] = useState(false);
  const [styleAll, setStyleAll] = useState(true);


  return (
    <div className="film-list">
      <div className="div-btn-film">
      <Button className="btn-film"
          style={
            styleAll === isAll
              ? {
                color: "#fc9a07",
                borderBottom: "#fc9a07 solid 2px",
                background: "rgb(20, 20, 20)"
              }
              : {}
          }
          onClick={() => {
            dispatch(layDanhSachPhimAction())
            setStyleDang(false);
            setStyleSap(false);
            setStyleAll(true)
          }}
        >
          TẤT CẢ CÁC PHIM
        </Button>
        <Button className="btn-film"
          style={
            styleDang === nowShowing
              ? {
                color: "#fc9a07",
                borderBottom: "#fc9a07 solid 2px",
                background: "rgb(20, 20, 20)"
              }
              : {}
          }
          onClick={() => {
            const action = {
              type: SET_FILM_DANG_CHIEU,
            };
            dispatch(action);
            setStyleDang(true);
            setStyleSap(false);
            setStyleAll(false)
          }}
        >
          PHIM ĐANG CHIẾU
        </Button>
        <Button className="btn-film"
          style={
            styleSap === comingSoon
              ? {
              }
              : {
                color: "#fc9a07",
                borderBottom: "#fc9a07 solid 2px",
                background: "rgb(20, 20, 20)"
              }
          }
          onClick={() => {
            const action = {
              type: SET_FILM_SAP_CHIEU,
            };
            dispatch(action);
            setStyleSap(true);
            setStyleDang(false);
          }}
        >
          PHIM SẮP CHIẾU
        </Button>
      </div>
      <Grid container spacing={5}>
        {props.arf?.map((film, index) => (
          <Film item={film} key={index} />
        ))
        }
      </Grid>
    </div>


  );
}


export default FilmList;