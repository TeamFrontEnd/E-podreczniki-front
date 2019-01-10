import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import styles from "./User.css";

class UserAccount extends Component {
  state = {
    email: "",
    textbooks: []
  };
  getUserInfo = async email => {
    let data = {
      email: email
    };
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.post("http://127.0.0.1:8000/api/user", data, confg);
    console.log(res);
    this.setState({
      email: this.props.email,
      textbooks: res.data.data
    });
  };
  componentDidMount() {
    this.getUserInfo(this.props.email);
  }

  generateTextbookList = list => {
    return list.map((textbook, index) => {
      return (
        <tr key={"textbookUser_" + index}>
          <th scope="row">{index + 1}</th>
          <td>{textbook.title}</td>
          <td>
            <Link to={"/textbook/" + textbook.slug}>{textbook.slug}</Link>
          </td>
        </tr>
      );
    });
  };
  render() {
    if (!this.props.logIn) return <Redirect to="/" />;
    const { textbooks } = this.state;
    let tableBody;
    if (Array.isArray(textbooks) && textbooks.length)
      tableBody = this.generateTextbookList(textbooks);
    return (
      <div className={styles.userAccountDiv}>
        <h2>Użytkownik</h2>
        <h1>{this.props.email}</h1>
        <div className={styles.myBooksDiv}>
          <h4>
            Moje podręczniki{" "}
            <Link to="/user/textbook">
              <i className="fas fa-plus iFontAwesome" />
            </Link>
          </h4>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

UserAccount.propTypes = {
  logIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  logIn: state.app.logIn,
  email: state.app.email
});

export default connect(
  mapStateToProps,
  {}
)(UserAccount);
