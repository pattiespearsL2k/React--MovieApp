import React, { useEffect } from 'react'
import { Tabs, Radio, Space, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { layfilmDetailAction } from '../../redux/actions/QuanLyPhimActions';
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import moment from 'moment'; //npm i moment
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Grid } from "@mui/material";
import "./FilmDetail.css"
const { TabPane } = Tabs;


export default function FilmDetail(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        // get data from url
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id));
    }, []);

    const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

    return (
        <div className="film-detail">
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={5}>
                    <img className='img-film' src={filmDetail.image} alt={filmDetail.title} />
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                    <h4>{filmDetail.title}</h4>
                    {/* <div className="movie-info">
                        <label>Đạo diễn: </label>
                        <div className='std'>Yamaguchi Susumu</div>
                    </div> */}
                    {/* <div className="movie-info">
                        <label>Thời gian: </label>
                        <div className='std'>{filmDetail.duration + " phút"}</div>
                    </div> */}
                    <div className="movie-info">
                        <label>Thời lượng: </label>
                        <div className='std'>{filmDetail.duration + " phút"}</div>
                    </div>
                    <div className="movie-info">
                        <label>Thể loại: </label>
                        <div className='std'>{filmDetail.genre}</div>
                    </div>
                    <div className="movie-info">
                        <label>Khởi chiếu: </label>
                        <div className='std'>{moment(filmDetail.releaseDate).format('DD.MM.YYYY')}</div>
                    </div>
                    {/* <div className="movie-info">
                        <label>Thời lượng: </label>
                        <div className='std'>{filmDetail.duration}phút</div>
                    </div> */}
                    <div className="movie-info">
                        <label>Quốc gia: </label>
                        <div className='std'>{filmDetail.country}</div>
                    </div>
                    <div className="movie-info">
                        <label>Rated: </label>
                        <div className='std'>{filmDetail.rating}</div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <h4 className='film-content'>NỘI DUNG PHIM</h4>
                    <p className='film-margin'>{filmDetail.description} </p>
                </Grid>
                <Grid item xs={12} className="schedule-padding" >
                    <h4 className='film-content'>LỊCH CHIẾU</h4>
                    <Tabs className='tab-film' tabPosition={'left'} >
                        {filmDetail.cinema?.map((htr, index) => {
                            return <TabPane
                                tab={<div className="flex flex-row items-center justify-center">
                                    <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                    <div >
                                        {htr.name}
                                    </div>
                                </div>}
                                key={index}>
                                {htr.cumRapChieu?.map((cumRap, index) => {
                                    return <div className="mt-5 cinema-part" key={index}>
                                        <div className="flex flex-row">
                                            <p className='cinema-p' style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.cinemaChildName}</p>
                                            <div className="ml-2 cinema-child">
                                                <p className='cinema-address' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                    return <NavLink to={`/booking/${lichChieu.showID}`} key={index} className="schedule-info col-span-1 text-green-800 font-bold">
                                                        {(lichChieu.showtime)}
                                                        {/* {lichChieu.showday} */}
                                                    </NavLink>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </TabPane>
                        })}
                    </Tabs>
                </Grid>
            </Grid>
        </div>

    )
}






