import React from 'react';
import FontAwesome from "react-fontawesome";
import faStyle from "font-awesome/css/font-awesome.css";
// import './Style/Styles.css'
// import '../../Style/Styles.css'
import './footer.scss'

const Footer = () => (
  <section className="container_footer">
    <div class="footer-basic">
      <footer>

        <div class="social">
          <a href='#'><FontAwesome className="fab fa-twitter"></FontAwesome></a>
          <a href='#'><FontAwesome className="fab fa-facebook-f"></FontAwesome></a>
          <a href='#'><FontAwesome className="fas fa-envelope"></FontAwesome></a>
          <a href='#'><FontAwesome className="fas fa-instagram"></FontAwesome></a>
        </div>

        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Home</a></li>
          <li class="list-inline-item"><a href="#">Services</a></li>
          <li class="list-inline-item"><a href="#">About</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        </ul>
        {/* <hr style= {{height: "1px", color: "#666666"}}/> */}

        <div className="col-auto ms-auto foo_content">
          <p style={{ color: "#545353" }}>&copy; 2021 Bussiness company- private poliy.Template by VIMAL</p>
        </div>
      </footer>
    </div>

  </section>
);


export default Footer