import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import "./style.css";

const Footer = () => {
    return (
        <footer className="footer text-white position-relative py-5">
            <div className="container">
                <div className="row">
                    <ul className="col-12 fs-6 mb-4 mb-lg-5 list-unstyled">
                        <div className="d-flex justify-content-center gap-lg-4 gap-2">
                            <li className="menuItem">Terms Of Use</li>
                            <li className="menuItem">Privacy-Policy</li>
                            <li className="menuItem">About</li>
                            <li className="menuItem">Blog</li>
                            <li className="menuItem">FAQ</li>
                        </div>
                    </ul>
                    <div className="col-12 mb-3 mb-lg-5 opacity-50 text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                    <div className="col-12 socialIcons d-flex align-items-center justify-content-center gap-3">
                        <span className="icon rounded-circle d-flex align-items-center justify-content-center">
                            <FaFacebookF />
                        </span>
                        <span className="icon rounded-circle d-flex align-items-center justify-content-center">
                            <FaInstagram />
                        </span>
                        <span className="icon rounded-circle d-flex align-items-center justify-content-center">
                            <FaTwitter />
                        </span>
                        <span className="icon rounded-circle d-flex align-items-center justify-content-center">
                            <FaLinkedin />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

