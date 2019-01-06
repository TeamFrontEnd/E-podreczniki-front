import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getCategories } from "../../actions/sectionActions";

import "./Section.css";

class Category extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="categoryBox">
        {this.props.categories.map(category => {
          let srcName = "http://127.0.0.1:8000" + category.path;
          return (
            <Link to={"/category/" + category.slug} className="categoryLink">
              <img
                className="categoryImage"
                src={srcName}
                alt={category.name + "_image"}
              />
              <div className="categoryLabel">{category.name}</div>
            </Link>
          );
        })}
      </div>
    );
  }
}

Category.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categories: state.section.categories
});

export default connect(
  mapStateToProps,
  { getCategories }
)(Category);
