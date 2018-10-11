import React from "react";
import classNames from "classnames";
import * as R from "ramda";
import { connect } from "react-redux";
import { getCategories, getActiveCategoryId } from "selectors";
import { Link, withRouter } from "react-router";
import { compose } from "redux";

const Categories = ({ categories, activeCategoryId }) => {
  const renderCategory = (category, index) => {
    const getActiveState = R.propEq("id", activeCategoryId); // прверяем что category.id равен activeCategoryId
    const linkClass = classNames({
      "list-group-item": true, // чтобы всегда был этот класс вне зав от логики
      active: getActiveState(category)
    });
    return (
      <Link to={`/categories/${category.id}`} className={linkClass} key={index}>
        {category.name}
      </Link>
    );
  };

  const renderAllCategory = () => {
    const linkClass = classNames({
      "list-group-item": true,
      // prettier-ignore
      "active": R.isNil(activeCategoryId)
    });

    return (
      <Link to="/" className={linkClass}>
        All
      </Link>
    );
  };

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps)
});

export default compose(
  withRouter, //Метод withRouter дает нам возможность вторым параметром в mapStateToProps получить ownProps, которая содержит в себе id категории из url.
  connect(
    mapStateToProps,
    null
  )
)(Categories);
