import React, { useEffect } from 'react'
import { Tabs, Radio, Space, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { layThongTinPhimAction } from '../../redux/actions/QuanLyPhimActions';
import moment from 'moment'; //npm i moment
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Grid } from "@mui/material";
import "./FilmDetail.css"
const { TabPane } = Tabs;


export default function FilmDetail(props) {

    const thongTinPhim = useSelector(state => state.QuanLyPhimReducer.thongTinPhim);
    console.log({ thongTinPhim })
    const dispatch = useDispatch();
    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
    }, [])

    return (
        <div className="film-detail">
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={5}>
                    <img className='img-film' src={thongTinPhim.image} alt={thongTinPhim.title} />
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                    <h4>{thongTinPhim.title}</h4>
                    <div className="movie-info">
                        <label>Đạo diễn: </label>
                        <div className='std'>Yamaguchi Susumu</div>
                    </div>
                    <div className="movie-info">
                        <label>Diễn viên: </label>
                        <div className='std'>Subaru Kimura, Megumi Oohara, Megumi Oohara, Kakazu Yumi, Seki Tomokazu</div>
                    </div>
                    <div className="movie-info">
                        <label>Thể loại: </label>
                        <div className='std'>{thongTinPhim.genre}</div>
                    </div>
                    <div className="movie-info">
                        <label>Khởi chiếu: </label>
                        <div className='std'>{moment(thongTinPhim.releaseDate).format('DD.MM.YYYY')}</div>
                    </div>
                    <div className="movie-info">
                        <label>Thời lượng: </label>
                        <div className='std'>{thongTinPhim.duration}phút</div>
                    </div>
                    <div className="movie-info">
                        <label>Ngôn ngữ: </label>
                        <div className='std'>{thongTinPhim.country}</div>
                    </div>
                    <div className="movie-info">
                        <label>Rated: </label>
                        <div className='std'>{thongTinPhim.rating}</div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <h4 className='film-content'>NỘI DUNG PHIM</h4>
                    <p className='film-margin'>{thongTinPhim.description} </p>
                </Grid>
                {/* <Grid item xs={12} className="schedule-padding" >
                    <h4 className='film-content'>LỊCH CHIẾU</h4>
                    <Tabs className='tab-film' tabPosition={'left'} >
                        {thongTinPhim.heThongRapChieu?.map((htr, index) => {
                            return <TabPane
                                tab={<div className="flex flex-row items-center justify-center">
                                    <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                    <div >
                                        {htr.tenHeThongRap}
                                    </div>
                                </div>}
                                key={index}>
                                {htr.cumRapChieu?.map((cumRap, index) => {
                                    return <div className="mt-5 cinema-part" key={index}>
                                        <div className="flex flex-row">
                                            <p className='cinema-p' style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                            <div className="ml-2 cinema-child">
                                                <p className='cinema-address' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                    return <NavLink to={`/booking/${lichChieu.maLichChieu}`} key={index} className="schedule-info col-span-1 text-green-800 font-bold">
                                                        {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                })}
                            </TabPane>
                        })}
                    </Tabs>
                </Grid> */}
            </Grid>
        </div>

    )
}






