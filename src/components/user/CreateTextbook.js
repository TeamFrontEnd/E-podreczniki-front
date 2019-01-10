import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Redirect } from "react-router-dom";

import {
  removeChapter,
  removeLesson,
  addTextbook
} from "./../../actions/userActions";

import styles from "./User.css";

class CreateTextbook extends Component {
  state = {
    title: "",
    errors: {}
  };
  generateTextBookLessons = (lessons, textbookUuid) => {
    return lessons.map((lesson, indexLesson) => {
      return (
        <Fragment key={"EbookLesson_" + indexLesson}>
          <span className={styles.listLessonSpan}>
            {lesson.title}
            <i
              className="fas fa-trash"
              title="Usuń z E-podręcznika"
              onClick={this.props.removeLesson.bind(this, lesson.uuid)}
            />
          </span>
        </Fragment>
      );
    });
  };

  generateTextBookChapters = () => {
    return this.props.chapters.map((chapter, indexChapter) => {
      let lessonList;
      if (
        chapter.hasOwnProperty("lessons") &&
        Array.isArray(chapter.lessons) &&
        chapter.lessons.length
      ) {
        lessonList = this.generateTextBookLessons(
          chapter.lessons,
          chapter.uuid
        );
      }
      return (
        <Fragment key={"EbookChapter_" + indexChapter}>
          <span className={styles.listChapterSpan}>
            {chapter.title}
            <i
              className="fas fa-trash"
              title="Usuń z E-podręcznika"
              onClick={this.props.removeChapter.bind(this, chapter.uuid)}
            />
          </span>
          {lessonList ? (
            <div className={styles.listLessonList}>{lessonList}</div>
          ) : null}
        </Fragment>
      );
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title } = this.state;

    if (title === "") {
      this.setState({ errors: { title: "Nazwa wymagana." } });
      return;
    }

    let data = {
      email: this.props.email,
      textbook: {
        title: this.state.title,
        chapters: this.props.chapters
      }
    };
    console.log(data);
    this.props.addTextbook(data);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showForm = () => {
    let textbook = this.generateTextBookChapters();
    return (
      <Fragment>
        <div className={styles.listChapterList}>{textbook}</div>
        <form onSubmit={this.onSubmit} className={styles.formAddTextbook}>
          <input
            type="name"
            name="title"
            className={classnames("form-control form-control-lg", {
              "is-invalid": this.state.errors.title
            })}
            placeholder="Podaj nazwę podręcznika"
            value={this.state.title}
            onChange={this.onChange}
          />
          {this.state.errors.title && (
            <div className="invalid-feedback">{this.state.errors.title}</div>
          )}
          <input
            type="submit"
            value="Zapisz"
            className="btn btn-primary btn-block"
          />
        </form>
      </Fragment>
    );
  };
  render() {
    if (this.props.sendStatus) return <Redirect to="/user/account" />;
    let display;
    if (!this.props.chapters.length) display = <h5>Wybierz rozdział</h5>;
    else display = this.showForm();

    return <div className={styles.addEbookForm}>{display}</div>;
  }
}

CreateTextbook.propTypes = {
  chapters: PropTypes.array.isRequired,
  removeChapter: PropTypes.func.isRequired,
  removeLesson: PropTypes.func.isRequired,
  addTextbook: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  sendStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  chapters: state.user.chapters,
  email: state.app.email,
  sendStatus: state.user.sendStatus
});

export default connect(
  mapStateToProps,
  { removeChapter, removeLesson, addTextbook }
)(CreateTextbook);
