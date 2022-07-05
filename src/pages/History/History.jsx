import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const History = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

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
    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, [])
    return (
        <div className="history">
            <TableContainer className="history-ticket" component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Số thứ tự </StyledTableCell>
                            <StyledTableCell align="center">Giờ đặt vé</StyledTableCell>
                            <StyledTableCell align="center">Ngày đặt vé</StyledTableCell>
                            {/* <StyledTableCell align="center">Rạp</StyledTableCell> */}
                            <StyledTableCell align="center">Phim</StyledTableCell>
                            <StyledTableCell align="center">Giá</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {thongTinNguoiDung.bookingInformation?.map((ticket, index) => {
                            //  const seats = _.first(ticket.danhSachGhe);
                            return < StyledTableRow key={index} >
                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {moment(ticket.bookingDate).format(' hh:mm:ss')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {moment(ticket.bookingDate).format('DD-MM-YYYY ')}
                                </StyledTableCell>
                                <StyledTableCell align="center" > {ticket.titleMovie}</StyledTableCell>
                                <StyledTableCell align="center">{ticket.price}</StyledTableCell>
                                {/* {ticket.listChair?.map((seat, index)=>{
                              return <StyledTableCell key={index} align="center">{seat.cinemaName}</StyledTableCell>  */}
                               {/* <StyledTableCell align="right">{seat.roomName}</StyledTableCell>  */}      
                            {/* })} */}
                                </StyledTableRow>
                        })};
                    </TableBody>
                </Table >
            </TableContainer >
        </div>

    )
}

export default History