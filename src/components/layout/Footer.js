import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { changePopupStatus, logOut } from "../../actions/appActions";
//import { getLessons } from '../../actions/lessonActions';
import logo_project from "../../img/logo_project.png";
import loginimg from "../../img/login.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../src/App.css";

class Footer extends Component {  
  render() {
    return (
    <div className="FooterBox"> 
      <div className="Footer">
      <p></p>
      <p><a className="FooterLink" href="google.pl">Regulamin</a></p>
      <p><a className="FooterLink" href="">O e-podręcznikach</a></p>
      <p><a className="FooterLink" href="">Kontakt</a></p>
      </div>
    </div>
    );
  }
}



export default Footer;