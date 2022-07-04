import React from 'react';
import logo from "../../assets/images/logo.png"
import galaxy from "../../assets/images/galaxy.png"
import bhd from "../../assets/images/phd.png"
import mega from "../../assets/images/megapng.png"
import lotte from "../../assets/images/lotte.png"
import cine from "../../assets/images/cine.jpeg"
import cgv from "../../assets/images/CGV.png"
import "./footer.css"
import { NavLink } from "react-router-dom"
Footer.propTypes = {

};

function Footer(props) {
    return (

        <section className="footer">
            <div className="footer__top">
                <div className="footer__title">
                    <h1>Nhận các thông báo khuyến mãi, giảm giá về email của bạn</h1>
                </div>
                <div className="footer__form">
                    <input placeholder="Nhập email của bạn" type="text" />
                    <button>
                        <a href="#">
                            OK
                        </a>
                    </button>
                </div>
            </div>
            <div className="footer__main py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 column">
                            <div className="row footer__pd" >
                                <div className="col-md-4 column mt-md-0 mt-4 footer__before">
                                    <h3>Liên hệ</h3>
                                    <ul className="footer__list">
                                        <li><a href="#url">34 Nguyễn Khắc Nhu</a></li>
                                        <li><a href="#url">0978831747</a></li>
                                        <li><a href="#url">umicinema@gmail.com</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-4 column footer__before">
                                    <h3>Giới thiệu</h3>
                                    <ul className="footer__list">
                                        <li><a href="index.html">Về chúng tôi</a></li>
                                        <li><a href="about.html">Thỏa thuận sử dụng</a></li>
                                        <li><a href="services.html">Quy chế hoạt động</a></li>
                                        <li><a href="blog.html">Chính sách bảo mật</a></li>
                                    </ul>
                                </div>

                                <div className="col-md-4 column mt-md-0 mt-4 footer__before">
                                    <h3>Đối tác</h3>
                                    <ul className="footer__list footer__logo">
                                        <NavLink href ="cgv.com" to="">
                                            <img  src={cgv} alt="" />
                                        </NavLink>
                                        <NavLink to="">
                                            <img src={lotte} alt="" />
                                        </NavLink>
                                        <NavLink to="">
                                            <img src={mega} alt="" />
                                        </NavLink>
                                        <NavLink to="" >
                                            <img src={cine} alt="" />
                                        </NavLink>
                                        <NavLink to="" >
                                            <img src={galaxy} alt="" />
                                        </NavLink>
                                        <NavLink to="" >
                                            <img src={bhd} alt="" />
                                        </NavLink>
                                    </ul>
                                </div>
                            </div>
                        </div >
                    </div >
                    <div className=" footer__icon below-section ">
                        <div className="columns text-lg-left text-center">
                            <p>© 2020 Masterwork. All rights reserved | Designed by <a href="">UmiCinema</a>
                            </p>
                        </div>
                        <div className="columns-2 mt-lg-0 mt-3">
                            <ul className="footer__social">
                                <li><a href="#facebook"><i className="fab fa-facebook-f" /></a>
                                </li>
                                <li><a href="#linkedin"><i className="fab fa-linkedin" /></a>
                                </li>
                                <li><a href="#twitter"><i className="fab fa-twitter" /></a>
                                </li>
                                <li><a href="#google"><i className="fab fa-google-plus" /></a>
                                </li>
                                <li><a href="#github"><i className="fab fa-github" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
            </div >

        </section >



    );
}

export default Footer;