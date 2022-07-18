import { DeleteOutlined } from "@ant-design/icons";
import { Grid } from "@mui/material";
import { Tabs } from "antd";
import moment from "moment"; //npm i moment
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayList from "../../../components/FilmDetail/DayList";
import {
  layThongTinChiTietPhim,
  xoaLichChieuAction,
} from "../../../redux/actions/QuanLyRapActions";
import _ from "lodash";
import { quanLyRapService } from "../../../services/QuanLyRapService";

const { TabPane } = Tabs;

export default function ViewShowTime(props) {
  const [statePhim, setStatePhim] = useState({
    heThongRap: [],
  });

  const [state, setState] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const dispatch = useDispatch();
  console.log(state, "state");
  let { id } = props.match.params;

  useEffect(() => {
    // get data from url
    dispatch(layThongTinChiTietPhim(id));
  }, []);
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  const handleChangeHeThongRap = async (state) => {
    // từ hệ thống rạp call api lấy thông tin rạp
    console.log(state, "handleRap");
    try {
      let result = await quanLyRapService.layThongTinLichChieuPhim(id, state);
      console.log(result, "resultRap");
      setStatePhim({
        ...statePhim,
        heThongRap: result.data.cinema,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ok");
    handleChangeHeThongRap(state);
  }, [state]);

  console.log(statePhim.heThongRap, "heThongRap");

  return (
    <div className="film-detail">
      <h1 style={{ color: "#fff", textAlign: "center" }}>{filmDetail.title}</h1>
      <Grid container spacing={6}>
        <Grid lichChieu xs={12} className="schedule-padding">
          <h4 className="film-content">LỊCH CHIẾU</h4>
          <DayList setState={setState} />
          <Tabs className="tab-film" tabPosition={"left"}>
            {statePhim.heThongRap?.map((htr, index) => {
              return (
                <TabPane
                  className="tab-left"
                  tab={
                    <div className="flex flex-row lichChieus-center justify-center">
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
                  {htr.cumRapChieu?.map((cumRap, index) => {
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
                            {_.sortBy(cumRap.lichChieuPhim, ["showtime"]).map(
                              (lichChieu, index) => {
                                return (
                                  <button
                                    className="btn-view-showtime"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Bạn có chắc muốn xoá lịch chiếu " +
                                            lichChieu.showtime +
                                            "không?"
                                        )
                                      ) {
                                        dispatch(
                                          xoaLichChieuAction(lichChieu.showID)
                                        );
                                      }
                                    }}
                                    key={index}
                                  >
                                    <DeleteOutlined />
                                    {lichChieu.showtime}
                                  </button>
                                );
                              }
                            )}
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
