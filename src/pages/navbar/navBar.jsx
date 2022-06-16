import { useEffect, useState } from "react";
// import Login from "../login/Login";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    AppBar, CssBaseline, InputBase,
    makeStyles, Tabs, Toolbar, useMediaQuery, useTheme
} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../assets/images/logoM.png';
import Login from '../form/Login';
import Register from '../form/Register';
import LogOut from '../logout/Logout';
import DrawerComponent from "./Drawer";
import './navBar.css';
const arrowRight = <FontAwesomeIcon icon={faArrowRight} />


const useStyles = makeStyles(() => ({
    navlinks: {
        marginLeft: useTheme().spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: useTheme().spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
    search: {
        position: 'relative',
        borderRadius: useTheme().shape.borderRadius,
        backgroundColor: alpha(useTheme().palette.common.white, 0.5),
        '&:hover': {
            backgroundColor: alpha(useTheme().palette.common.white, 0.8),
        },
        marginLeft: 0,
        width: '100%',
        height: '2.5em',
        [useTheme().breakpoints.up('sm')]: {
            marginLeft: useTheme().spacing(1),
            width: 'auto',
        },
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        padding: useTheme().spacing(0, 2),
        position: "absolute",
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    inputRoot: {
        color: '#000',
    },
    inputInput: {
        padding: useTheme().spacing(0, 1, 0, 0),
        paddingLeft: `calc(1em + ${useTheme().spacing(4)}px)`,
        transition: useTheme().transitions.create('width'),
        width: '100%',
        [useTheme().breakpoints.up('sm')]: {
            width: '22ch',
            // '&:focus': {
            //     width: '20ch',
            // },
        },
    }
}));


function Navbar(props) {
    const { t, i18n } = useTranslation()

    const dispatch = useDispatch()
    const { Component, isVisible } = useSelector(state => state.ModalReducer)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const [title, setTitle] = useState("");

    const handleCancel = () => {
        dispatch({
            type: 'CLOSE_MODAL',
            isVisible: false,
        })
    };

    const showLogin = () => {
        dispatch({
            type: 'OPEN_MODAL',
            Component: <Login />,
            isVisible: true,
        })
    };

    const showRegister = () => {
        dispatch({
            type: 'OPEN_MODAL',
            Component: <Register />,
            isVisible: true,
        })
    };

    // Select languages
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        i18n.changeLanguage(value)
    };

    // Change when scroll
    const [header, setHeader] = useState("header");


    // clicked ? setHeader("header-click) : '';
    const [bgcolor, setBgColor] = useState(false)

    const handleClick = (e) => {
        // console.log("ok");
        setBgColor(prev => !prev)
        // setHeader("header color-header");
    }


    const listenScrollEvent = (event) => {
        if (window.scrollY < 10) {
            return setHeader("header")
        } else
            return setHeader("header2")

    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () =>
            window.removeEventListener('scroll', listenScrollEvent);
    }, []);

    // Handle anything
    const [value, setValue] = useState();
    const history = useHistory();

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar className={bgcolor ? `${header} color-header` : `${header}`}>
            <CssBaseline />
            <Toolbar >
                <NavLink to="/" variant="h4" className={classes.logo}>
                    <img className="logoWeb logo-scroll hide-nav" src={logo} alt="logo" />
                </NavLink>
                <div className="header-main header-main-scroll">
                    <div className="header-top">
                        <div className={`hide-nav btn-search ${classes.search}`} >
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Tìm kiếm..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search ' }}
                            />
                        </div>
                        <div className="account hide-nav navright">
                            {/* <Login /> */}
                            {!!userLogin.taiKhoan ?
                                <LogOut />
                                :
                                <>
                                    {/* <Button onClick={showLogin}>
                                        {t("Log in")}
                                    </Button>
                                    <Button onClick={showRegister}>
                                        {t("Register")}
                                    </Button> */}

                                    <Button variant="outlined" className="login" onClick={showLogin}>
                                        <div className='btn-login-flex'>
                                            Đăng nhập
                                            <span className="login-effect"></span>
                                            <span className="login-effect"></span>
                                            <span className="login-effect"></span>
                                            <span className="login-effect"></span>
                                            <div className="arrow">
                                                {arrowRight}
                                            </div>
                                        </div>
                                    </Button>

                                </>
                            }
                            <div class="select">
                                <select>
                                    <option selected value="1">VN</option>
                                    <option value="3">EN</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="header-bottom">
                        {isMobile ? (
                            <DrawerComponent />
                        ) : (

                            <nav >

                                <li>
                                    <NavLink className="nav-scroll none-pad" to="/schedule" onClick={handleClick}>LỊCH CHIẾU</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-scroll" to="/price" >GIÁ VÉ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-scroll" to="/event" >KHUYẾN MÃI</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-scroll" to="/contact" >LIÊN HỆ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-scroll" to="/blog" >BLOG PHIM </NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-scroll none" to="/member" >THÀNH VIÊN</NavLink>
                                </li>
                            </nav>

                        )}
                    </div>
                </div>
            </Toolbar>
            <Modal
                title={title}
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {Component}
            </Modal>
        </AppBar>
    );
}
export default Navbar;