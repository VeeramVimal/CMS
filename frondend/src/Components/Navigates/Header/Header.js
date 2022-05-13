import React, { useEffect, useState, useRef } from "react";
import logo from "../../../Asserts/images/logo/vr_logo.png";
import { Nav, Navbar, NavItem, Modal, Button, Popover } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
// import "../../Style/Styles.css";
import './header.scss'
import "font-awesome/css/font-awesome.css";
import { Home } from "react-feather";

const Header = () => {


  return (
    <section className="header">
      <div className="nav-container">
        {/* <nav className="bar bar-absolute  navbar-expand-sm bg-light navbar-light"> */}
        <nav className="bar bar-absolute navbar-expand-sm navbar-light fw-bold fst-italic">
          <div className="container-fluid h-7">
            <div className="row" >
              <div className="col-md-8" >
                <div className="nav justify-content-start me-3 mt-3" >
                  <ul className="navbar-nav justify-content-end">
                    <li className="nav-item">
                      <a className="nav-link" href="#HOME">HOME</a>
                    </li>
                    <li className="nav-item">
                      {/* <a className="nav-link" href="#about">ABOUT US</a> */}
                      {/* <a className="nav-link" href="#HOME"></a> */}

                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" >PORTFOLIO</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" >BLOG</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" >PAGES</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#contact">CONTACT US </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="model_img">
                  <a href="#">
                    <img src={logo} alt="profilePic" className="img_logo"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Header;