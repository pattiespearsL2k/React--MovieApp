import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilmList from '../../components/FilmList/FilmList'
import Promotion from '../../pages/promotion/Promotion';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import SlideHome from '../../pages/slideHome/slideHome';


export default function Home(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);
    }, [])
    const { arf } = useSelector(state => state.QuanLyPhimReducer);

    // console.log(arf, 'arf');

    return (
        <div>
            <SlideHome />
            <div className='film'>
                <FilmList arf={arf} />
            </div>
            <Promotion />
        </div>
    )
}
