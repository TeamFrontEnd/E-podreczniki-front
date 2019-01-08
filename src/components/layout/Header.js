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

class Header extends Component {
  componentDidMount() {
    //  this.props.getLessons(this.props.apiToken);
  }
  onLinkClick = e => {
    e.preventDefault();
    this.props.changePopupStatus(true);
  };

  onClickLogOut = () => {
    this.props.logOut();
  };
  render() {
    return (
      <div className="appHeader">
        <div className="headerContent">
          <Link to="/">
            <img src={logo_project} alt="Epodreczniki_logo" />
          </Link>
          <div className="userPanel">
            {this.props.logIn ? (
              <span className="emailAdress">{this.props.email}</span>
            ) : ( 
              <a href="login" className="accoutLink" onClick={this.onLinkClick}>
               
                <img src={loginimg} className="loginimg"/>
              </a>
            )}

            {this.props.logIn ? (
              <div className="logutBtn" onClick={this.onClickLogOut}>
                Wyloguj
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  changePopupStatus: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  logIn: PropTypes.bool.isRequired,
  // getLessons: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  apiToken: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  email: state.app.email,
  logIn: state.app.logIn,
  apiToken: state.app.apiToken
});

export default connect(
  mapStateToProps,
  { changePopupStatus, logOut }
)(Header);
