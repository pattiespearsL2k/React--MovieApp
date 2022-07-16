import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import "./App.css"
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";

import Home from './components/Home/Home.jsx'
import ScrollToTop from "react-scroll-to-top";
import Schedule from './components/Schedule/Schedule.jsx';
import FilmDetail from './components/FilmDetail/FilmDetail.jsx';
import Promotion from './pages/promotion/Promotion';
import Booking from './components/Booking/Booking';
import Loading from './components/Loading/Loading';
import Member from './pages/member/Member';
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import AddUser from "./pages/Admin/Dashboard/AddUser";
import EditUser from "./pages/Admin/Dashboard/EditUser";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import AddNew from "./pages/Admin/Films/AddNew";
import Edit from "./pages/Admin/Films/Edit";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Film from "./pages/Manager/Film/Film.jsx";
import History from './pages/History/History';
import ManagerTemplate from './templates/ManagerTemplate/ManagerTemplate';
import ShowtimeManager from './pages/Manager/Showtime/ShowTime.jsx'
import Cinema from './pages/Admin/Cinema/Cinema';
import ViewShowTime from './pages/Admin/ShowTime/ViewShowTime';
import ViewShowTimeManager from './pages/Manager/Showtime/ViewShowTimeManager';
import AddCinema from './pages/Admin/Cinema/AddCinema';
import EditCinema from './pages/Admin/Cinema/EditCinema';
import CinemaChild from './pages/Manager/CinemaChild/CinemaChild';
import AddCinemaChild from './pages/Manager/CinemaChild/AddCinemaChild';
import EditCinemaChild from './pages/Manager/CinemaChild/EditCinemaChild';
import DetailTicket from './pages/DetailTicket/DetailTicket';
import QR from './pages/QR/QR';



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <HomeTemplate exact path="/" component={Home} />
      <Route exact path="/detailticket/:id" component={DetailTicket} />
      <HomeTemplate exact path='/schedule' component={Schedule} />
      <Route exact path='/qr/:id' component={QR} />
      <HomeTemplate exact path='/event' component={Promotion} />
      <HomeTemplate exact path='/member' component={Member} />
      <HomeTemplate exact path='/history' component={History} />
      <HomeTemplate exact path='/detail/:id' component={FilmDetail} />
      <CheckoutTemplate path="/booking/:id" exact component={Booking} />
      <AdminTemplate path="/admin" component={Dashboard} />
      <AdminTemplate path="/admin/adduser" component={AddUser} />
      <AdminTemplate path="/admin/edituser/:username" component={EditUser} />
      <AdminTemplate path="/admin/films" component={Films} />
      <AdminTemplate path="/admin/films/addnew" component={AddNew} />
      <AdminTemplate path="/admin/films/edit/:id" component={Edit} />
      <AdminTemplate path="/admin/films/showtime/:id/:title" component={ShowTime} />
      <AdminTemplate path="/admin/showtime" component={ShowTime} />
      <AdminTemplate path="/admin/cinema" component={Cinema} />
      <AdminTemplate path="/admin/cinema/addnew" component={AddCinema} />
      <AdminTemplate path="/admin/films/showtime/:id" component={ViewShowTime} />
      <AdminTemplate path="/admin/cinema/edit/:id" component={EditCinema} />
      <ManagerTemplate path="/manager" component={Film} />
      <ManagerTemplate path="/manager/showtime/:id/:title" component={ShowtimeManager} />
      <ManagerTemplate path="/manager/showtime/:id" component={ViewShowTimeManager} />
      <ManagerTemplate path="/manager/cinemachild" component={CinemaChild} />
      <ManagerTemplate path="/manager/cinemachild/add" component={AddCinemaChild} />
      <ManagerTemplate path="/manager/cinemachild/edit/:id" component={EditCinemaChild} />
      <ScrollToTop />
    </Router>
  );
}
export default App;
