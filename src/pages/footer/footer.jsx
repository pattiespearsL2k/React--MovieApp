import React from 'react';
import logo from "../../assets/images/logo.png"
import galaxy from "../../assets/images/galaxy.png"
import momo from "../../assets/images/momo.png"
import metiz from "../../assets/images/metiz.png"
import starlight from "../../assets/images/starlight.png"
import mega from "../../assets/images/megapng.png"
import "./footer.css"
Footer.propTypes = {

};

function Footer(props) {
    return (

        <section className="footer">
            <div class="footer__top">
                <div class="footer__title">
                    <h1>Nhận các thông báo khuyến mãi, giảm giá về email của bạn</h1>
                </div>
                <div class="footer__form">
                    <div>
                        <input placeholder="Nhập email của bạn" type="text" name id />
                        <button>
                            <a href="#"><i className="las la-paper-plane" /></a>
                        </button>
                    </div>

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
                                    <ul className="footer__list">
                                        <img src={metiz} alt="" />
                                        <img src={galaxy} alt="" />
                                        <img src={starlight} alt="" />
                                        <img src={mega} alt="" />
                                        <img src={metiz} alt="" />
                                        <img src={metiz} alt="" />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>

        </section>



    );
}

export default Footer;