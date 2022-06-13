import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilmList from '../../components/FilmList/FilmList'
import Promotion from '../../pages/promotion/Promotion';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import SlideHome from '../../pages/slideHome/slideHome';


export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);
    }, [])

    return (
        <div>
            <SlideHome/>
            <div className='film'>
                <FilmList arrFilm={arrFilm} />
            </div>
            <Promotion />
        </div>
    )
}
