import React, { useEffect, useState } from "react";
import { Tabs, Radio, Space, Rate } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { layfilmDetailAction } from "../../../redux/actions/QuanLyPhimActions";
import {
  layThongTinChiTietPhim,
  xoaLichChieuAction,
} from "../../../redux/actions/QuanLyRapActions";
import moment from "moment"; //npm i moment
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import DayList from "../../../components/FilmDetail/DayList";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function ViewShowTime(props) {
  const [statePhim, setStatePhim] = useState({
    cumRapChieu: [],
  });

  const [state, setState] = useState();
  const dispatch = useDispatch();
  console.log(state, "state");

  useEffect(() => {
    // get data from url
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhim(id));
  }, []);

  const handleChangeHeThongRap = async (state) => {
    // console.log(value)
    // từ hệ thống rạp call api lấy thông tin rạp
    console.log(state, "handleRap");
    try {
      let result =
        await quanLyRapService.layThongTinLichChieuHeThongRapTheoNgay(state);
      console.log(result, "resultRap");
      setStatePhim({
        ...statePhim,
        cumRapChieu: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get data from url
    console.log("ok");
    handleChangeHeThongRap(state);
  }, [state]);

  console.log(statePhim.cumRapChieu, "cumRapChieu");

  return (
    <div className="film-detail">
      <Grid container spacing={6}>
        <Grid item xs={12} className="schedule-padding">
          <h4 className="film-content">LỊCH CHIẾU</h4>
          <DayList setState={setState} />
          <Tabs className="tab-film" tabPosition={"left"}>
            {statePhim.cumRapChieu?.map((htr, index) => {
              return (
                <TabPane
                  className="tab-left"
                  tab={
                    <div className="flex flex-row items-center justify-center">
                      <img
                        src={htr.logo}
                        className="rounded-full w-full"
                        style={{ width: 50 }}
                        alt="..."
                      />
                      <div className="name">{htr.name}</div>
                    </div>
                  }
                  key={index}
                >
                  {htr.lstCinemaChild?.map((cumRap, index) => {
                    return (
                      <div className="mt-5 cinema-part" key={index}>
                        <div className="flex flex-row">
                          <p
                            className="cinema-p"
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              lineHeight: 1,
                            }}
                          >
                            {cumRap.cinemaChildName}
                          </p>
                          <div className="ml-2 cinema-child">
                            <p
                              className="cinema-address"
                              style={{ marginTop: 0 }}
                            >
                              {cumRap.address}
                            </p>
                            {cumRap.listMovie
                              ?.slice(0, 12)
                              .map((lichChieu, index) => {
                                return (
                                  <p key={index}>
                                    {" "}
                                    {lichChieu.lstShowFlowMovie?.map(
                                      (item, index) => {
                                        return (
                                          <button
                                            className="btn-view-showtime"
                                            onClick={() => {
                                              if (
                                                window.confirm(
                                                  "Bạn có chắc muốn xoá lịch chiếu " +
                                                    item.showtime +
                                                    "không?"
                                                )
                                              ) {
                                                dispatch(
                                                  xoaLichChieuAction(
                                                    item.showID
                                                  )
                                                );
                                              }
                                            }}
                                            key={index}
                                          >
                                            <DeleteOutlined />
                                            {item.showtime}
                                          </button>
                                        );
                                      }
                                    )}
                                  </p>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
}
