import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import './Booking.css';
import style from './Booking.module.css'
import { CHUYEN_TAB, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType'
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { datVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
// import { connection } from '../../index';
import { NavLink, Redirect } from 'react-router-dom';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import { USER_LOGIN } from '../../util/settings/config';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);

    const dispatch = useDispatch();
    // console.log('danhSachGheDangDat', danhSachGheDangDat);
    useEffect(() => {
        //Gọi hàm tạo ra 1 async function 
        const action = layChiTietPhongVeAction(props.match.params.id);
        //Dispatch function này đi
        dispatch(action);

        //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
        // connection.on('datVeThanhCong', () => {
        //     dispatch(action);
        // })



        //Vừa vào trang load tất cả ghế của các người khác đang đặt
        // connection.invoke('loadDanhSachGhe', props.match.params.id);


        //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
        // connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
        //     // console.log('danhSachGheKhachDat', dsGheKhachDat);
        //     //Bước 1: Loại mình ra khỏi danh sách 
        //     dsGheKhachDat = dsGheKhachDat.filter(item => item.username !== userLogin.username);
        //     //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 

        //     let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        //         let arrGhe = JSON.parse(item.danhSachGhe);

        //         return [...result, ...arrGhe];
        //     }, []);

        //     //Đưa dữ liệu ghế khách đặt cập nhật redux
        //     arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'chairID');

        //     //Đưa dữ liệu ghế khách đặt về redux
        //     dispatch({
        //         type: 'DAT_GHE',
        //         arrGheKhachDat
        //     })

        // })

        //Cài đặt sự kiện khi reload trang
        // window.addEventListener("beforeunload", clearGhe);

        return () => {
            // clearGhe();
            // window.removeEventListener('beforeunload', clearGhe);
        }
    }, [])
    // const clearGhe = function (event) {
    //     connection.invoke('huyDat', userLogin.username, props.match.params.id);
    // }



    const { informationMovie, listChair } = chiTietPhongVe;
    // console.log({ chiTietPhongVe });
    // console.log("ds", listChair)

    const renderSeats = () => {
        return listChair?.map((ghe, index) => {
            // nếu typeChair =vip => classGheVip ="gheVip"
            let classGheVip = ghe.typeChair === 'Vip' ? 'gheVip' : '';

            let classGheDaDat = ghe.booked === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.chairID === ghe.chairID);

            //Kiểm tra từng render xem có phải ghế khách đặt hay không
            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.chairID === ghe.chairID);
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDat';
            }
            let classGheDaDuocDat = '';
            if (userLogin.username === ghe.userAccount) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            // nếu đã có trong mảng đang đặt
            if (indexGheDD != -1) {
                classGheDaDat = 'gheDangDat';
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    const action = datGheAction(ghe, props.match.params.id);
                    dispatch(action);

                }}
                    disabled={ghe.booked || classGheKhachDat !== ''}
                    className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`} key={index}>
                    {ghe.stt}
                </button>
                {(index + 1) % 12 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="mt-5" >
            <Grid container spacing={5} >
                <Grid item xs={6} md={12} lg={8} >
                    <div className="screen-type">
                        <div className="type-flex">
                            <li>
                                <div>
                                    <button className="ghe-label text-center">
                                    </button>
                                </div>
                                <span>
                                    Ghế chưa đặt
                                </span>
                            </li>
                            <li>
                                <div>
                                    <button className="ghe-label gheDangDat text-center">
                                    </button>
                                </div>
                                <span>
                                    Ghế đang đặt
                                </span>
                            </li>
                            <li>
                                <div>
                                    <button className="ghe-label gheVip text-center">
                                    </button>
                                </div>
                                <span>
                                    Ghế vip
                                </span>
                            </li>
                            <li>
                                <div>
                                    <button className="ghe-label gheDaDat text-center">
                                    </button>
                                </div>
                                <span>
                                    Ghế đã đặt
                                </span>
                            </li>
                        </div>

                    </div>
                    <div className="text-center bg-grey">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#f7b130" fill-opacity="1" d="M0,160L80,149.3C160,139,320,117,480,96C640,75,800,53,960,69.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                        </svg>
                        <h3 className="screen-name">MÀN HÌNH</h3>
                    </div>
                    <div className='render-seat'>
                        {renderSeats()}
                    </div>
                </Grid>
                <Grid item xs={6} md={12} lg={4}>
                    <div>
                        <div className='img-checkout'>
                            <img src={informationMovie.image} alt={informationMovie.title} />
                        </div>
                        <h3 className="text-xl screen-name-film">{informationMovie.title}</h3>
                        <hr />
                        <div className='screen-info'>
                            <p>Địa điểm:</p>
                            <span>{informationMovie.cinemaChildName}</span>
                        </div>
                        <div className='screen-info'>
                            <p>Rạp:</p>
                            <span>{informationMovie.roomName}</span>
                        </div>
                        <div className='screen-info'>
                            <p>Ngày chiếu:</p>
                            <span>{informationMovie.showday} - {(informationMovie.showtime)}</span>
                        </div>
                        <div className='scd'>
                            <p>Ghế:</p>
                            <span>
                                {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                    return <span key={index} className="screen-seat">
                                        {gheDD.stt}
                                    </span>
                                })}</span>
                        </div>
                        <div className="screen-info">
                            <p>Số vé:</p>
                            <span>{danhSachGheDangDat.length}</span>
                        </div>
                        <hr />
                        <div className="screen-info-1">
                            <p>Tổng tiền:</p>
                            <span className='screen-total'>
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.price;
                                }, 0).toLocaleString()} VNĐ
                            </span>
                        </div>

                        <div className='btn-book mb-0 flex flex-col items-center'>
                            <button onClick={() => {
                                const bookingInformation = new ThongTinDatVe();
                                bookingInformation.showID = props.match.params.id;
                                bookingInformation.listChair = danhSachGheDangDat;
                                bookingInformation.userAccount = userLogin.username;
                                dispatch(datVeAction(bookingInformation))

                            }} className='pointer bg-green-500 text-white w-full text-center p-y-6 fw-500 fs-18 radius-5'>
                                ĐẶT VÉ
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}


const { TabPane } = Tabs;

export default function CheckoutTab(props) {
    useEffect(() => {
        return () => {
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: '1'
            })
        }
    }, [])
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();



    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền  truy cập vào trang này vui lòng đăng nhập!')
        return <Redirect to='/' />
    };




    const operations = <Fragment>
        {!_.isEmpty(userLogin) ?
            <Fragment>
            </Fragment> : ''}


    </Fragment>


    return <div className="tab-checkout">
        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {

            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: key.toString()
            })
        }}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>

    </div>

}


function KetQuaDatVe(props) {

    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log("thongTinnguoidung", thongTinNguoiDung)



    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, [])

    // console.log('thongTinNguoiDung', thongTinNguoiDung);

    // return thongTinNguoiDung.bookingInformation?.map((ticket, index) => {
    //     const seats = _.first(ticket.listChair);
    //     return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
    //         <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
    //             <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.image} />
    //             <div className="flex-grow">
    //                 <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.title}</h2>
    //                 <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.showtime).format('hh:mm A')} - 
    //                 <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
    //                 <p><span className="font-bold">Địa điểm:</span> {seats.name}   </p>
    //                 <p>
    //                     <span className="font-bold">Tên rạp:</span>  {seats.cinemaChildName} -
    //                 </p>
    //             </div>
    //         </div>
    //     </div>

    // })



    return (
        <TableContainer className="history-ticket" component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Số thứ tự </StyledTableCell>
                        <StyledTableCell align="center">Ngày giờ đặt</StyledTableCell>
                        <StyledTableCell align="center">Rạp</StyledTableCell>
                        <StyledTableCell align="center">Phim</StyledTableCell>
                        <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                        <StyledTableCell align="center">Giá</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {thongTinNguoiDung.bookingInformation?.map((ticket, index) => (

                        //  const seats = _.first(ticket.danhSachGhe);
                        < StyledTableRow >
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">
                                {ticket.bookingDate}
                            </StyledTableCell>
                            <StyledTableCell align="center">Rạp</StyledTableCell>
                            {/* <StyledTableCell align="right">{seats.tenHeThongRap}- {seats.tenCumRap}</StyledTableCell> */}
                            <StyledTableCell align="center" > {ticket.titleMovie}</StyledTableCell>
                            <StyledTableCell align="center">
                                {ticket.price}
                                {/* <img src={ticket.image} style={{ width: "50px", height: "50px" }} alt="" /> */}
                            </StyledTableCell>
                            <StyledTableCell align="center">Giá</StyledTableCell>
                        </StyledTableRow>
                    ))};
                </TableBody>
            </Table >
        </TableContainer >
    )

}