import React, { Component } from "react";
import axios from "axios";

class Lessons extends Component {
  state = {
    requestMessage: "",
    lesson: {}
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

  componentDidMount() {
    this.getLesson(this.props.match.params.slug);
  }
  render() {
    let count = 1;
    return (
      <React.Fragment>
        <div className="lessonsList">
          <h1 className="mb-2">Lekcje</h1>
          Tutaj bedzie lista z poprzedniej strony
          {/* {this.props.lessons.map(lesson => (
            <span
              className="lessonLink"
              onClick={this.onLinkClick.bind(this, lesson.id)}
              key={'lesson_' + lesson.id}
            >
              {count++}. {lesson.title}
            </span>
          ))} */}
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

export default Lessons;
