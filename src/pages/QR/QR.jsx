import React from "react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { layThongTinChiTietVeAction } from "../../redux/actions/QuanLyDatVeActions";
const QR = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let { id } = props.match.params;
    console.log(id);
    dispatch(layThongTinChiTietVeAction(id));
  }, []);

  const chiTietVe = useSelector((state) => state.QuanLyDatVeReducer.chiTietVe);

  const [url, setUrl] = useState();
  useEffect(() => {
    let { id } = props.match.params;
    let src = `http://localhost:3000/detailticket/${id}`;
    QRCode.toDataURL(src).then((data) => {
      setUrl(data);
    });
  }, []);

  return (
    <div className="qr-code" style={{ padding: "20px 0" }}>
      <p style={{ fontSize: "20px", textAlign: "center" }}>
        {" "}
        <b>Mã vé: {chiTietVe.couponID}</b>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        ,<img src={url} alt="" />
      </div>
      <p style={{ textAlign: "center" }}>
        {" "}
        <i>Vui lòng đưa mã QR này đến quầy vé để nhận vé của bạn </i>
      </p>
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
              {_.sortBy(chiTietVe.listChair, ["chairName"]).map(
                (seat, index) => {
                  return (
                    <span key={index} align="center">
                      {seat.chairName + ", "}
                    </span>
                  );
                }
              )}
            </td>
          </tr>
          <tr>
            <td>TỔNG CỘNG</td>
            <td>{chiTietVe.price}đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QR;
