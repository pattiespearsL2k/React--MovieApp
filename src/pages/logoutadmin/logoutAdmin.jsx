import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../App';
import { Link } from "react-router-dom";
import $ from "jquery";
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import "./logout.css"
export default function LogOutAdmin() {
  const dispatch = useDispatch()
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  const handleLogout = () => {
    dispatch(LogoutAction())
    history.push('/')
  }


  return (

    <div class="header__navbar--item header__navbar-user">
      <img src="https://cdn4.vectorstock.com/i/1000x1000/62/48/green-round-glossy-login-icon-vector-2976248.jpg"
        alt="" class="header__navbar-user-img" />
      <UserOutlined className="buttonAccount" />
      <span class="header__navbar-user-name">{userLogin.username}</span>
      <ul class="header__navbar-user-menu1">
        <li class=" header__navbar-user-item header__navbar-user-item--separate  ">
          <Link class="header__navbar-user-item-link" href="" onClick={handleLogout}>Đăng xuất</Link>
        </li>
      </ul>
    </div>
  )
}

const LogOutStyled = styled.div`

.user-login {
    color: #000;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    padding: 6px 15px;
    min-width: 100px;

    &::after {
      display: none;
    }
  }

  .dropdown-menu {
    border-radius: 5px;
    min-width: 100%;
    padding: 0;

    .dropdown-item {
      padding: 6px 15px;
      text-align: center;

      &:hover {
        border-radius: 5px;
      }

      &:active {
        background: #fff;
        color: #000;
      }
    }
  }
`

