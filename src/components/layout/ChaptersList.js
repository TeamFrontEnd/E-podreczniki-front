import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import { addChapter, addLesson } from "./../../actions/userActions";

class ChaptersList extends Component {
  state = {
    chapters: [],
    textbookSlug: ""
  };

  getChaptersAndLessons = async slug => {
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
      chapters: res.data.data,
      textbookSlug: slug
    });
  };

  addToEbook = slug => {
    let chosenChaper = this.state.chapters.filter(chapter =>
      chapter.slug === slug ? chapter : null
    );

    this.props.addChapter(chosenChaper[0]);
  };

  generateChapterList = () => {
    const { chapterSpan, lessonSpan, lessonList } = this.props.classList;
    return this.state.chapters.map((chapter, chapterIndex) => {
      let lessonListJsx = null;
      if (
        Array.isArray(chapter.lessons) &&
        chapter.lessons.length
        //chapter.showLessons
      ) {
        lessonListJsx = chapter.lessons.map((lesson, index) => {
          return (
            <span
              className={lessonSpan}
              key={"lessonlist_" + index + "_" + chapterIndex}
            >
              {index + 1 + ". "}
              {lesson.title}
              <i
                className="fas fa-plus"
                title="Dodaj do E-podręcznika lekcję"
                onClick={this.props.addLesson.bind(this, lesson)}
              />
            </span>
          );
        });
      }
      return (
        <Fragment key={"chapter_" + chapterIndex}>
          <span className={chapterSpan}>
            {chapterIndex + 1 + ". "}
            {chapter.title}
            <i
              className="fas fa-plus"
              title="Dodaj do E-podręcznika"
              onClick={this.addToEbook.bind(this, chapter.slug)}
            />
          </span>
          {lessonListJsx ? (
            <div className={lessonList}>{lessonListJsx}</div>
          ) : null}
        </Fragment>
      );
    });
  };

  componentDidMount() {
    this.getChaptersAndLessons(this.props.slug);
  }
  render() {
    const { errorSpan, chapterList } = this.props.classList;
    let errorMessage;
    if (this.state.textbookSlug !== "" && !this.state.chapters.length)
      errorMessage = <span className={errorSpan}>Brak kontentu.</span>;
    return (
      <div className={chapterList}>
        {this.generateChapterList()}
        {errorMessage}
      </div>
    );
  }
}

ChaptersList.propTypes = {
  slug: PropTypes.string.isRequired,
  classList: PropTypes.object.isRequired,
  addChapter: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired
};

export default connect(
  null,
  { addChapter, addLesson }
)(ChaptersList);
