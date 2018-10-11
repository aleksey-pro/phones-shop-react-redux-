import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import { Link } from "react-router";
import BasketCart from "containers/components/BasketCart";

import { fetchPhoneById, addPhoneToBasket } from "actions";
import { getPhoneById } from "selectors";

class Phone extends Component {
  componentDidMount() {
    //params содержит параметры урла, то есть id берем из него
    this.props.fetchPhoneById(this.props.params.id);
  }

  renderContent() {
    const { phone } = this.props;

    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
            <img className="img-thumbnail" src={phone.image} alt={phone.name} />
          </div>
          <div className="col-md-6">{this.renderFields()}</div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right">${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p>{phone.description}</p>
        </div>
      </div>
    );
  }

  renderFields() {
    const { phone } = this.props;

    const columnFields = R.compose(
      R.toPairs,
      R.pick(["cpu", "camera", "size", "weight", "display", "memory"])
    )(phone);

    return columnFields.map(([key, value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">{value}</div>
      </div>
    ));
  }

  renderSidebar() {
    const { phone, addPhoneToBasket } = this.props;
    return (
      <div>
        <p className="lead">Quick shop</p>
        <BasketCart />
        <div className="form-group">
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link to="/" className="btn btn-info btn-block">
          Bask to store
        </Link>
        <button
          type="button"
          className="btn btn-succes btn-block"
          onClick={() => addPhoneToBasket(phone.id)}
        >
          Add to cart
        </button>
      </div>
    );
  }

  render() {
    const { phone } = this.props;
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">{phone && this.renderContent()}</div>
            <div className="col-md-3">{phone && this.renderSidebar()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    phone: getPhoneById(state, state.phonePage.id)
  };
};

const mapDispatchToProps = {
  fetchPhoneById,
  addPhoneToBasket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phone);
