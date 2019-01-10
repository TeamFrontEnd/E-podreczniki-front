import React, { Component } from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  changePopupStatus,
  logIn,
  registerUser
} from "../../actions/appActions";
import "../../../src/App.css";

class AccountPopup extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  closeModal = () => {
    if (this.props.popUpOpen === true) {
      this.props.changePopupStatus(false);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "E-mail jest wymagany." } });
      return;
    }
    if (password === "") {
      this.setState({ errors: { password: "Hasło jest wymagane." } });
      return;
    }

    const newLoginTry = {
      email,
      password
    };

    this.props.logIn(newLoginTry);
  };

  handleRegister = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === "") {
      this.setState({ errors: { email: "E-mail jest wymagany." } });
      return;
    }
    if (password === "") {
      this.setState({ errors: { password: "Hasło jest wymagane." } });
      return;
    }

    const newUser = {
      email,
      password
    };

    this.props.registerUser(newUser);
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <Popup
        open={this.props.popUpOpen}
        closeOnDocumentClick
        onClose={this.closeModal}
        contentStyle={{ width: "600px", padding: "20px" }}
      >
        <div className="loginPanel">
          <div className="card mb-3">
            <div className="card-header">Logowanie</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Podaj E-mail"
                    value={email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Haslo</label>
                  <input
                    type="password"
                    name="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Podaj haso"
                    value={password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <input
                  type="submit"
                  value="Zaloguj"
                  className="btn btn-light btn-block"
                />
                <button
                  onClick={this.handleRegister.bind(this)}
                  className="btn btn-light btn-block"
                >
                  Zarejestruj
                </button>
              </form>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

AccountPopup.propTypes = {
  popUpOpen: PropTypes.bool.isRequired,
  changePopupStatus: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  popUpOpen: state.app.popUpOpen
});

export default connect(
  mapStateToProps,
  { changePopupStatus, logIn, registerUser }
)(AccountPopup);
