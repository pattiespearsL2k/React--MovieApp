
import React, {useState} from "react";
import Film from "../Film/Film"
import Grid from '@mui/material/Grid';
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType'
import "./FilmList.css"


const FilmList = (props) => {

  const dispatch = useDispatch();
  const { nowShowing, comingSoon } = useSelector(state => state.QuanLyPhimReducer);
  const [styleDang, setStyleDang] = useState(true);
  const [styleSap, setStyleSap] = useState(false);


  return (
    <div className="film-list">
      <div className="div-btn-film">
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
            console.log(props.arrPhim)
          }}
        >
          PHIM ĐANG CHIẾU
        </Button>
        <Button
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
            console.log(props.arrPhim)
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