import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const History = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  return (
    <div className="history">
      <TableContainer className="history-ticket" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Số thứ tự </StyledTableCell>
              <StyledTableCell align="center">Mã vé </StyledTableCell>
              {/* <StyledTableCell align="center">Giờ đặt vé</StyledTableCell>
              <StyledTableCell align="center">Ngày đặt vé</StyledTableCell> */}
              <StyledTableCell align="center">Phim</StyledTableCell>
              <StyledTableCell align="center">Giá</StyledTableCell>
              {/* <StyledTableCell align="center">Hệ thống rạp</StyledTableCell> */}
              <StyledTableCell align="center">Cụm rạp</StyledTableCell>
              <StyledTableCell align="center">Phòng chiếu</StyledTableCell>
              <StyledTableCell align="center">Ghế</StyledTableCell>
              <StyledTableCell align="center">Chi tiết</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {thongTinNguoiDung.bookingInformation?.map((ticket, index) => {
              //  const seats = _.first(ticket.danhSachGhe);
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {ticket.couponID}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    {moment(ticket.bookingDate).format(" hh:mm:ss")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(ticket.bookingDate).format("DD-MM-YYYY ")}
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    {" "}
                    {ticket.titleMovie}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {ticket.price}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    {ticket.listChair[0].cinemaID}
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    {ticket.listChair[0].cinemaChildName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {ticket.listChair[0].roomName}
                  </StyledTableCell>
                  <StyledTableCell className="chair-history">
                    {ticket.listChair.map((seat, index) => {
                      return (
                        <span key={index} align="center">
                          {seat.chairName + " "}
                        </span>
                      );
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <NavLink to={`/qr/${ticket.couponID}`} href="#">
                     Chi tiết
                    </NavLink>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
