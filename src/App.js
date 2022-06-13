import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import "./App.css"
import NavBar from './pages/navbar/navBar';
import { useSelector, useDispatch } from 'react-redux'
import { layDanhSachPhimAction } from './redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from './redux/actions/QuanLyRapActions';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Contact from './pages/contact/contact.jsx'
import Home from './components/Home/Home.jsx'
import ScrollToTop from "react-scroll-to-top";
import Schedule from './components/Schedule/Schedule.jsx';
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';
import Promotion from './pages/promotion/Promotion';
import FilmList from './components/FilmList/FilmList';
import Booking from './components/Booking/Booking';
import Loading from './components/Loading/Loading'

export const history = createBrowserHistory();

function App() {
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  // const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  console.log('propsHome', arrFilm);
  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);
    // dispatch(layDanhSachHeThongRapAction());
  }, [])
  return (
    <Router history={history}>
      <Loading/>
      <HomeTemplate exact path="/" component={Home} />
      <HomeTemplate exact path='/schedule' component={Schedule} />
      <HomeTemplate exact path='/event' component={Promotion} />
      <HomeTemplate exact path='/film' component={FilmList} />
      <HomeTemplate exact path='/detail/:id' component={FilmDetail} />
      <CheckoutTemplate path="/booking/:id" exact component={Booking} />
      <ScrollToTop />
    </Router>
  );
}
export default App;
