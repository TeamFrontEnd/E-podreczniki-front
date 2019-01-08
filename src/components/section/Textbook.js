import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Textbook extends Component {
  state = {
    requestMessage: "Send requrest", //FIXME: nice message
    textbooks: [],
    category: {}
  };

  getTextbooks = async slug => {
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.get(
      "http://127.0.0.1:8000/api/category/" + slug,
      {},
      confg
    );
    console.log(res); //FIXME: remove console.log

    this.setState({
      requestMessage: res.data.message,
      textbooks: res.data.data,
      category: res.data.additionalData
    });
  };

  componentDidMount() {
    this.getTextbooks(this.props.match.params.slug);
  }

  render() {
    const { textbooks, category } = this.state;
    return (
      <div>
        <h1>Textbooks but also searchBar to do</h1>
        {category.name}
        {textbooks.map(book => {
          let srcName = "http://127.0.0.1:8000" + book.path;
          return (
            <div className="bookListItem">
              <Link to={"/textbook/" + book.slug}>
                <img
                  src={srcName}
                  alt={book.title + " book image"}
                  className="bookImage"
                />
              </Link>
              <Link to={"/textbook/" + book.slug} className="bookTitle">
                {book.title}
              </Link>
              <ul className="bookData">
                <li>
                  <span className="bookDataSpan">Pod redakcją: </span>
                  {book.editor}
                </li>
                <li>
                  <span className="bookDataSpan">Autorzy: </span>
                  {book.authors}
                </li>
                <li>
                  <span className="bookDataSpan">ISBN: </span>
                  {/* //TODO: ISBN */}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Textbook;
