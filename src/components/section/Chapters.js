import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Chapters extends Component {
  state = {
    requestMessage: "",
    textbookContent: []
  };

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
      textbookContent: res.data.data.map(chapter => ({
        ...chapter,
        showLessons: true
      }))
    });
  };

  componentDidMount() {
    this.getChapters(this.props.match.params.slug);
  }

  toggleChapter = index => {
    this.setState((state, props) => ({
      textbookContent: state.textbookContent.map((chapter, indexChapter) =>
        indexChapter === index
          ? {
              ...chapter,
              showLessons: !chapter.showLessons
            }
          : chapter
      )
    }));
  };

  generateBookContent = () => {
    let content = this.state.textbookContent.map((chapter, chapterIndex) => {
      let chapterContent = null;
      if (
        Array.isArray(chapter.lessons) &&
        chapter.lessons.length &&
        chapter.showLessons
      ) {
        chapterContent = chapter.lessons.map((lesson, index) => {
          return (
            <Link className="spanLessonList" to={"/lesson/" + lesson.slug}>
              {index + 1 + ". " + lesson.title}
            </Link>
          );
        });
      }
      return (
        <div>
          <h3 onClick={this.toggleChapter.bind(this, chapterIndex)}>
            Rozdział {chapter.number}.{" " + chapter.title}
          </h3>
          {chapterContent ? (
            <div className="bookLessonList">{chapterContent}</div>
          ) : null}
        </div>
      );
    });
    return content;
  };

  render() {
    let contentList;
    if (this.state.textbookContent.length)
      contentList = this.generateBookContent();
    return (
      <div>
        <h1>Rozdziały</h1>
        {contentList}
      </div>
    );
  }
}

export default Chapters;
