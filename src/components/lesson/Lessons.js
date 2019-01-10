import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./lesson.css";

class Lessons extends Component {
  state = {
    requestMessage: "",
    lesson: {},
    textbookContent: []
  };
  onLinkClick = (id, e) => {
    this.props.getLesson(this.props.apiToken, id);
  };

  getLesson = async slug => {
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.get(
      "http://127.0.0.1:8000/api/lesson/" + slug,
      {},
      confg
    );
    console.log(res); //FIXME: remove console.log

    this.setState({
      requestMessage: res.data.message,
      lesson: res.data.data
    });
  };

  //tu szukac wzorow w rozdziale

  getChapters = async slug => {
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.get(
      "http://127.0.0.1:8000/api/textbook/" + slug,
      {},
      confg
    );
    console.log(res); //FIXME: remove console.log

    this.setState({
      requestMessage: res.data.message,
      textbookContent: res.data.data,
      textbookTitle: res.data.additionalData.textbookTitle
    });
  };
  componentDidMount() {
    this.getChapters(this.props.slug);
    this.getLesson(this.props.match.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    this.getLesson(nextProps.match.params.slug);
  }

  generateList = () => {
    let list;
    list = this.state.textbookContent.map((chapter, index) => {
      let lessonList;
      if (chapter.lessons.length) {
        lessonList = chapter.lessons.map((lesson, lessonIndex) => {
          return (
            <Link
              className="titles"
              to={"/lesson/" + lesson.slug}
              key={"lesson_" + lessonIndex}
            >
              {lesson.title}
            </Link>
          );
        });
      }
      return (
        <div className="allTitle" key={"chapter_" + index}>
          <span className="chapterTitle">
            {" "}
            {"Rozdział "}
            {index + 1}
            {". " + chapter.title}{" "}
          </span>
          <span>{lessonList}</span>
        </div>
      );
    });

    return list;
  };

  render() {
    let contentList;
    contentList = this.generateList();
    return (
      <React.Fragment>
        <div className="lessonsList">
          <h1 className="mb-2">{this.state.textbookTitle}</h1>

          {contentList}
        </div>
        <div className="lessonsContent">
          <h2 className="lessonTitle">{this.state.lesson.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: this.state.lesson.content }}
          />
        </div>
      </React.Fragment>
    );
  }
}

Lessons.propTypes = {
  slug: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  slug: state.section.textbookSlug
});

export default connect(mapStateToProps)(Lessons);
