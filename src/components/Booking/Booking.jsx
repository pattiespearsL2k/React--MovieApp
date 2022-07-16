import { message, Tabs } from "antd";
import _ from "lodash";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datGheAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

import { Grid } from "@mui/material";
import { pick } from "lodash";
import { Redirect } from "react-router-dom";
import Payment from "../../pages/Payment/Payment";
import { USER_LOGIN } from "../../util/settings/config";
import "./Booking.css";

import { useState } from "react";
import {
  LIST_CHAIR,
  SHOW_ID,
  TOTAL_PRICE,
  USER_ACCOUNT,
} from "../../util/settings/config";

function Checkout(props) {
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();
  const total = danhSachGheDangDat.reduce((tongTien, ghe, index) => {
    return (tongTien += ghe.price);
  }, 0);
  console.log("danhSachGheDangDat", danhSachGheDangDat);
  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);

    return () => {};
  }, []);

  const handleVisiable = () => {
    setVisiable(false);
  };

  const { informationMovie, listChair } = chiTietPhongVe;
  const handleAlert = () => {
    if (danhSachGheDangDat.length > 0) {
      // dispatch({
      //   type: "CHUYEN_TAB",
      // });
      setVisiable(true);
    } else {
      console.log("ok");
      message.error({
        content: "Hãy chọn ghế",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    }
  };

  const renderSeats = () => {
    return listChair?.map((ghe, index) => {
      // nếu typeChair =vip => classGheVip ="gheVip"
      let classGheVip = ghe.typeChair === "Vip" ? "gheVip" : "";

      let classGheDaDat = ghe.booked === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.chairID === ghe.chairID
      );

      //Kiểm tra từng render xem có phải ghế khách đặt hay không
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.chairID === ghe.chairID
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      let classGheDaDuocDat = "";
      if (userLogin.username === ghe.userAccount) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      // nếu đã có trong mảng đang đặt
      if (indexGheDD != -1) {
        classGheDaDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              const action = datGheAction(ghe, props.match.params.id);
              dispatch(action);
            }}
            disabled={ghe.booked || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
            key={index}
          >
            {ghe.stt}
          </button>
          {(index + 1) % 12 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="mt-5">
      <Grid container spacing={5}>
        <Grid item xs={6} md={12} lg={8}>
          <div className="screen-type">
            <div className="type-flex">
              <li>
                <div>
                  <button className="ghe-label text-center"></button>
                </div>
                <span>Ghế chưa đặt</span>
              </li>
              <li>
                <div>
                  <button className="ghe-label gheDangDat text-center"></button>
                </div>
                <span>Ghế đang đặt</span>
              </li>
              <li>
                <div>
                  <button className="ghe-label gheVip text-center"></button>
                </div>
                <span>Ghế vip</span>
              </li>
              <li>
                <div>
                  <button className="ghe-label gheDaDat text-center"></button>
                </div>
                <span>Ghế đã đặt</span>
              </li>
            </div>
          </div>
          <div className="text-center bg-grey">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#f7b130"
                fill-opacity="1"
                d="M0,160L80,149.3C160,139,320,117,480,96C640,75,800,53,960,69.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              ></path>
            </svg>
            <h3 className="screen-name">MÀN HÌNH</h3>
          </div>
          <div className="render-seat">{renderSeats()}</div>
        </Grid>
        <Grid item xs={6} md={12} lg={4}>
          <div>
            <div className="img-checkout">
              <img src={informationMovie.image} alt={informationMovie.title} />
            </div>
            <h3 className="text-xl screen-name-film">
              {informationMovie.title}
            </h3>
            <hr />
            <div className="screen-info">
              <p>Địa điểm:</p>
              <span>{informationMovie.cinemaChildName}</span>
            </div>
            <div className="screen-info">
              <p>Rạp:</p>
              <span>{informationMovie.roomName}</span>
            </div>
            <div className="screen-info">
              <p>Suất chiếu:</p>
              <span>
                {informationMovie.showday} - {informationMovie.showtime}
              </span>
            </div>
            <div className="scd">
              <p>Ghế:</p>
              <span>
                {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                  return (
                    <span key={index} className="screen-seat">
                      {gheDD.stt}
                    </span>
                  );
                })}
              </span>
            </div>
            <div className="screen-info">
              <p>Số vé:</p>
              <span>{danhSachGheDangDat.length}</span>
            </div>
            <hr />
            <div className="screen-info-1">
              <p>Tổng tiền:</p>
              <span className="screen-total">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.price);
                  }, 0)
                  .toLocaleString()}{" "}
                VNĐ
              </span>
            </div>

            <div className="btn-book mb-0 flex flex-col items-center">
              <button
                onClick={() => {
                  const bookingInformation = new ThongTinDatVe();
                  bookingInformation.showID = props.match.params.id;
                  let newDanhSachGheDangDat = [];
                  danhSachGheDangDat?.map((item) => {
                    let newDatGhe = pick(item, ["chairID", "price"]);
                    newDanhSachGheDangDat.push(newDatGhe);
                  });
                  console.log(newDanhSachGheDangDat, "newDanhSachGheDangDat");
                  bookingInformation.listChair = danhSachGheDangDat;
                  // bookingInformation.userAccount = userLogin.username;
                  bookingInformation.totalPrice = total;
                  localStorage.setItem(
                    SHOW_ID,
                    JSON.stringify(bookingInformation.showID)
                  );
                  localStorage.setItem(
                    LIST_CHAIR,
                    JSON.stringify(newDanhSachGheDangDat)
                  );
                  localStorage.setItem(
                    USER_ACCOUNT,
                    JSON.stringify(bookingInformation.userAccount)
                  );
                  localStorage.setItem(
                    TOTAL_PRICE,
                    JSON.stringify(bookingInformation.totalPrice)
                  );
                  // alert("Hãy chọn ghế!");
                  handleAlert();
                }}
                className="pointer bg-green-500 text-white w-full text-center p-y-6 fw-500 fs-18 radius-5"
              >
                TIẾP TỤC
              </button>
            </div>
          </div>
          <Payment
            visiable={visiable}
            handleVisiable={handleVisiable}
            setVisiable={setVisiable}
          />
          ;
        </Grid>
      </Grid>
    </div>
  );
}
const { TabPane } = Tabs;

export default function CheckoutTab(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền  truy cập vào trang này vui lòng đăng nhập!");
    return <Redirect to="/" />;
  }

  const operations = (
    <Fragment>{!_.isEmpty(userLogin) ? <Fragment></Fragment> : ""}</Fragment>
  );

  return (
    <div className="tab-checkout">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: "CHUYEN_TAB",
            // number: key.toString(),
          });
        }}
      >
        <TabPane tab="CHỌN GHẾ" key="1">
          <Checkout {...props} />
        </TabPane>
        {/* <TabPane tab="02 THANH TOÁN" key="2">
          <Payment {...props} />
        </TabPane> */}
      </Tabs>
    </div>
  );
}
