import React from 'react';
import logo from "../../assets/images/logo.png"
import "./footer.css"
Footer.propTypes = {

};

function Footer(props) {
    return (
       
            <section className="footer">
                <div class="footer__top">
                    <div class="footer__title">
                        <h1>Subscribe To Our Newsletter</h1>
                    </div>
                    <div class="footer__form">
                        <div>
                            <input placeholder="Your Email Address" type="text" name id />
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
                                    <div className="col-md-4 column footer__before">
                                        <h3>Company</h3>
                                        <ul className="footer__list">
                                            <li><a href="index.html">Home</a></li>
                                            <li><a href="about.html">About Us</a></li>
                                            <li><a href="services.html">Services</a></li>
                                            <li><a href="blog.html">Blog</a></li>
                                            <li><a href="contact.html">Contact Us</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 column mt-md-0 mt-4 footer__before">
                                        <h3>Useful Links</h3>
                                        <ul className="footer__list">
                                            <li><a href="#url">Case Studies</a></li>
                                            <li><a href="#url">Our Branches</a></li>
                                            <li><a href="#url">Latest Media</a></li>
                                            <li><a href="about.html">About Company</a></li>
                                            <li><a href="#url">Our People</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 column mt-md-0 mt-4 footer__before">
                                        <h3>Our Services</h3>
                                        <ul className="footer__list">
                                            <li><a href="#url">Privacy Policy</a></li>
                                            <li><a href="#url">Our Terms</a></li>
                                            <li><a href="services.html">Services</a></li>
                                            <li><a href="landing-single.html">Landing Page</a></li>
                                            <li><a href="#url">Our People</a></li>
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