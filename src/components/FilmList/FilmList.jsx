
import React, { Component } from "react";
import Film from "../Film/Film"
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType'
import "./FilmList.css"


const FilmList = (props) => {

  const dispatch = useDispatch();
  const { nowShowing, comingSoon } = useSelector(state => state.QuanLyPhimReducer);
  // const renderFilms = () => {
  //   return props.arf?.map((item, index) => {
  //     return <Film item={item} key={index}/>
  //   })
  // }
  let activeClassDC = nowShowing === true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = comingSoon === true ? 'active_Film' : 'none_active_Film';

 

  console.log('activeSC', activeClassSC)

  return (
    <React.Fragment>
      <div className="div-btn-film">
        <button className={`${activeClassDC} btn-film`} onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU }
          dispatch(action);
        }}>PHIM ĐANG CHIẾU</button>
        <button className={`${activeClassSC} btn-film `} onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU }
          dispatch(action);
        }}>PHIM SẮP CHIẾU</button>
      </div>
      <Grid container spacing={5}>
        {props.arf?.map((film, index) => (
          <Film item={film} key={index} />
        ))
        }
      </Grid>
    </React.Fragment>
  );
}


export default FilmList;