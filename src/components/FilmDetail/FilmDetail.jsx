import { Grid } from "@mui/material";
import { Tabs } from "antd";
import moment from "moment"; //npm i moment
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapActions";
import { quanLyRapService } from "../../services/QuanLyRapService";
import DayList from "./DayList";
import "./FilmDetail.css";
import _ from "lodash";
const { TabPane } = Tabs;

export default function FilmDetail(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [statePhim, setStatePhim] = useState({
    heThongRap: [],
  });

  const [state, setState] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const dispatch = useDispatch();

  console.log(state, "state");

  useEffect(() => {
    // get data from url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  const handleChangeHeThongRap = async (state) => {
    console.log(state, "handleRap");
    let { id } = props.match.params;
    try {
      // let result =
      //   await quanLyRapService.layThongTinLichChieuHeThongRapTheoNgay(state);
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
    // get data from url
    console.log("ok");
    handleChangeHeThongRap(state);
  }, [state]);

  console.log(statePhim.heThongRap, "heThongRap");

  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  return (
    <div className="film-detail">
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={5}>
          <img
            className="img-film"
            src={filmDetail.image}
            alt={filmDetail.title}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <h4>{filmDetail.title}</h4>
          <div className="movie-info">
            <label>Thời lượng: </label>
            <div className="std">{filmDetail.duration + " phút"}</div>
          </div>
          <div className="movie-info">
            <label>Thể loại: </label>
            <div className="std">{filmDetail.genre}</div>
          </div>
          <div className="movie-info">
            <label>Khởi chiếu: </label>
            <div className="std">
              {moment(filmDetail.releaseDate).format("DD.MM.YYYY")}
            </div>
          </div>

          <div className="movie-info">
            <label>Quốc gia: </label>
            <div className="std">{filmDetail.country}</div>
          </div>

          <div className="movie-info-trailer">
            <label>Trailer: </label>
            <iframe width="420" height="205" src={filmDetail.trailer}></iframe>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h4 className="film-content">NỘI DUNG PHIM</h4>
          <p className="film-margin">{filmDetail.description} </p>
        </Grid>
        <Grid item xs={12} className="schedule-padding">
          <h4 className="film-content">LỊCH CHIẾU</h4>
          <DayList setState={setState} />
          <Tabs className="tab-film" tabPosition={"left"}>
            {statePhim.heThongRap?.map((htr, index) => {
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
                  {htr.cumRapChieu?.map((cumRap, index) => {
                    return (
                      <div className="mt-2 cinema-part" key={index}>
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
                                  <span key={index}>
                                    <NavLink
                                      to={`/booking/${lichChieu.showID}`}
                                      className="schedule-info col-span-1 text-green-800 font-bold"
                                    >
                                      {lichChieu.showtime}
                                    </NavLink>
                                  </span>
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
