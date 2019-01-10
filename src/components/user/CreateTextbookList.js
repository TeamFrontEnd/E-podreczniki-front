import React, { Component, Fragment } from "react";
import axios from "axios";

import ChaptersList from "./../layout/ChaptersList";
import CreateTextbook from "./CreateTextbook";

import styles from "./User.css";

class CreateTextbookList extends Component {
  state = {
    categories: []
  };

  //Download all categories
  getCategories = async () => {
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.get(
      "http://127.0.0.1:8000/api/categories",
      {},
      confg
    );
    console.log(res); //FIXME: remove console.log

    this.setState({
      categories: res.data.data
    });
  };
  getTextbooks = async slug => {
    let test = this.state.categories.some(category => {
      if (category.slug === slug && category.hasOwnProperty("textbookShow")) {
        this.setState((state, props) => ({
          categories: state.categories.map(stateCategory =>
            stateCategory === category
              ? {
                  ...stateCategory,
                  textbookShow: !stateCategory.textbookShow
                }
              : stateCategory
          )
        }));
        return true;
      }
      return false;
    });
    if (test) return;
    let confg = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.get(
      "http://127.0.0.1:8000/api/category/" + slug,
      {},
      confg
    );
    console.log(res); //FIXME: remove console.log

    this.setState((state, props) => ({
      categories: state.categories.map((category, index) => {
        if (category.slug === slug) {
          return {
            ...category,
            textbooks: res.data.data.map(textbook => ({
              ...textbook,
              showChapters: false
            })),
            textbookShow: true
          };
        } else {
          return category;
        }
      })
    }));
  };

  toggleChapters = slug => {
    this.setState((state, props) => ({
      categories: state.categories.map(category => {
        if (category.textbookShow) {
          category.textbooks = category.textbooks.map(textbook => {
            if (textbook.slug === slug)
              return {
                ...textbook,
                showChapters: !textbook.showChapters
              };
            return textbook;
          });
        }
        return category;
      })
    }));
  };
  generateList = () => {
    return this.state.categories.map((category, index) => {
      let textbookList;
      if (
        category.hasOwnProperty("textbookShow") &&
        category.textbookShow &&
        category.hasOwnProperty("textbooks") &&
        Array.isArray(category.textbooks) &&
        category.textbooks.length
      ) {
        textbookList = category.textbooks.map((textbook, textbookIndex) => {
          return (
            <Fragment key={"textbookSpan" + textbookIndex}>
              <span
                onClick={this.toggleChapters.bind(this, textbook.slug)}
                className={styles.listTextbookSpan}
              >
                {textbook.showChapters ? (
                  <i className="fas fa-caret-down" />
                ) : (
                  <i className="fas fa-caret-right" />
                )}{" "}
                {textbook.title}
              </span>
              {textbook.showChapters ? (
                <ChaptersList
                  slug={textbook.slug}
                  classList={{
                    chapterSpan: styles.listChapterSpan,
                    chapterList: styles.listChapterList,
                    lessonSpan: styles.listLessonSpan,
                    lessonList: styles.listLessonList,
                    errorSpan: styles.listErrorSpan
                  }}
                />
              ) : null}
            </Fragment>
          );
        });
      }
      return (
        <Fragment key={"categorySpan_" + index}>
          <span
            onClick={this.getTextbooks.bind(this, category.slug)}
            className={styles.listCategorySpan}
          >
            {textbookList ? (
              <i className="fas fa-caret-down" />
            ) : (
              <i className="fas fa-caret-right" />
            )}{" "}
            {category.name}
          </span>

          {textbookList ? (
            <div className={styles.listTextbookList}>{textbookList}</div>
          ) : null}
        </Fragment>
      );
    });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    let categories;
    if (this.state.categories.length) categories = this.generateList();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "800px"
        }}
      >
        <div className={styles.listCategoryList}>
          <h1>Wszystko</h1>
          {categories}
        </div>
        <CreateTextbook />
      </div>
    );
  }
}

export default CreateTextbookList;
