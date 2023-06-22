import React from "react";
import icon from '../../../public/icon.png';
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-orange-200 text-base-content">
            <div>
                <img src={icon} style={{ width: "70px", height: "70px" }} alt="" />
                <p className="font-bold font-serif">LanguageShala<br />Providing reliable services since 2022</p>
            </div>
            <div className="font-serif font-semibold">
                <span className="footer-title">Services</span>
                <a className="link link-hover">Spanish</a>
                <a className="link link-hover">French</a>
                <a className="link link-hover">Bangla</a>
                <a className="link link-hover">Portuguese</a>
            </div>
            <div className="font-serif font-semibold">
                <span className="footer-title">Contact Us</span>
                <p className="">Phone No: +8801085737375</p>
                <p className="">Address: 4/B block, Gulshan, Dhaka-1210, Bangladesh</p>
                <div className="flex">
                    <FaFacebook style={{ fontSize: "1.8rem" }} className="me-3"></FaFacebook> <FaTwitter style={{ fontSize: "1.8rem" }} className="me-3"></FaTwitter> <FaYoutube style={{ fontSize: "1.8rem" }}></FaYoutube>
                </div>
            </div>
            <div className="font-serif font-semibold">
                <p>&copy; 2023, LanguageShala. All rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;