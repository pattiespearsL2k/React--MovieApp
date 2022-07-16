import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietVeAction } from "../../redux/actions/QuanLyDatVeActions";
import _ from "lodash";
const DetailTicket = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    console.log(id);
    dispatch(layThongTinChiTietVeAction(id));
  }, []);

  const chiTietVe = useSelector((state) => state.QuanLyDatVeReducer.chiTietVe);
  console.log(chiTietVe.titleMovie);

  return (
    <table id="customers">
      <tbody>
        <tr>
          <th style={{ textAlign: "center", fontSize: "20px" }} colSpan={2}>
            THÔNG TIN VÉ
          </th>
        </tr>
        <tr>
          <td>Mã vé</td>
          <td>{chiTietVe.couponID}</td>
        </tr>
        <tr>
          <td>Tên phim</td>
          <td>{chiTietVe.titleMovie}</td>
        </tr>
        <tr>
          <td>Rạp phim</td>
          <td>{chiTietVe.cinemaName}</td>
        </tr>
        <tr>
          <td>Địa chỉ rạp</td>
          <td>{chiTietVe.address}</td>
        </tr>
        <tr>
          <td>Ngày giờ đặt vé</td>
          <td>{chiTietVe.bookingDate}</td>
        </tr>
        <tr>
          <td>Suất chiếu</td>
          <td>
            {chiTietVe.showtime} - {chiTietVe.showday}
          </td>
        </tr>
        <tr>
          <td>Phòng chiếu</td>
          <td>{chiTietVe.roomName}</td>
        </tr>
        <tr>
          <td>Ghế</td>
          <td>
            {" "}
            {_.sortBy(chiTietVe.listChair, ["chairName"]).map((seat, index) => {
              return (
                <span key={index} align="center">
                  {seat.chairName + ", "}
                </span>
              );
            })}
          </td>
        </tr>
        <tr>
          <td>TỔNG CỘNG</td>
          <td>{chiTietVe.price}đ</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DetailTicket;
