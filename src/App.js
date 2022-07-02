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
import FilmList from './components/FilmList/FilmList';
import Booking from './components/Booking/Booking';
import Loading from './components/Loading/Loading';
import Member from './pages/member/Member';
import Login from './pages/form/Login';
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



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <HomeTemplate exact path="/" component={Home} />
      <HomeTemplate exact path='/schedule' component={Schedule} />
      <HomeTemplate exact path='/event' component={Promotion} />
      <HomeTemplate exact path='/member' component={Member} />
      <HomeTemplate exact path='/history' component={History}/>
      <HomeTemplate exact path='/detail/:id' component={FilmDetail} />
      <CheckoutTemplate path="/booking/:id" exact component={Booking} />
      <AdminTemplate path="/admin" component={Dashboard} />
      <AdminTemplate path="/admin/adduser" component={AddUser} />
      <AdminTemplate path="/admin/edituser/:taiKhoan" component={EditUser} />
      <AdminTemplate path="/admin/films" component={Films} />
      <AdminTemplate path="/admin/films/addnew" component={AddNew} />
      <AdminTemplate path="/admin/films/edit/:id" component={Edit} />
      <AdminTemplate path="/admin/films/showtime/:id/:tenphim" component={ShowTime} />
      <AdminTemplate path="/admin/showtime" component={ShowTime} />
      <ManagerTemplate path="/manager" component={Film} />
      <ScrollToTop />
    </Router>
  );
}
export default App;
