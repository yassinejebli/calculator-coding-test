import React, { Component } from "react";
import moment from "moment";
import "./App.css";
import { Calculator } from "./calculator";
import { AD_TYPES, USER_TYPES } from "./constants";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0,
      newItem: {
        adType: -1,
        userType: -1,
        price: 100,
        endDate: moment().format("YYYY-MM-DD"),
      },
    };
  }

  onAdTypeChange = (event) => {
    const { newItem } = this.state;

    this.setState({
      newItem: {
        ...newItem,
        adType: parseInt(event.target.value, 10),
      },
    });
  };

  onUserTypeChanged = (event) => {
    const { newItem } = this.state;
    this.setState({
      newItem: {
        ...newItem,
        userType: parseInt(event.target.value, 10),
      },
    });
  };

  // Generic change handler
  onValueChanged = (event) => {
    const { newItem } = this.state;
    const valueShouldBeParsed = ["adType", "userType", "price"].includes(
      event.target.name
    );
    this.setState({
      newItem: {
        ...newItem,
        [event.target.name]: valueShouldBeParsed
          ? Number(event.target.value)
          : event.target.value,
      },
    });
  };

  onNewItemSubmit = (event) => {
    event.preventDefault();

    const calc = new Calculator();
    const { newItem } = this.state;
    const fee = calc.getFee(newItem);

    // update total
    this.setState({
      total: this.state.total + fee,
    });
  };

  onPriceChanged = (event) => {
    const { newItem } = this.state;

    this.setState({
      newItem: {
        ...newItem,
        price: Number(event.target.value),
      },
    });
  };

  onEndDateChanged = (event) => {
    const { newItem } = this.state;

    this.setState({
      newItem: {
        ...newItem,
        endDate: event.target.value,
      },
    });
  };

  render() {
    const { newItem, total } = this.state;

    return (
      <div>
        <Header />
        <div className="App-page">
          <h2>Items</h2>

          <p>Total fees: {total} </p>

          <h3>Register new item</h3>
          <form className="New-item-form" onSubmit={this.onNewItemSubmit}>
            <div className="form-group">
              <label>You are</label>
              <select
                className="form-control"
                name="adType"
                defaultValue="-1"
                onChange={this.onValueChanged}
              >
                <option value="-1">Select</option>
                <option value={USER_TYPES.PERSON}>Person</option>
                <option value={USER_TYPES.COMPANY}>Company</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ad Type</label>
              <select
                className="form-control"
                name="adType"
                defaultValue="-1"
                onChange={this.onValueChanged}
              >
                <option value="-1">Select </option>
                <option value={AD_TYPES.AUCTION}>Auction</option>
                <option value={AD_TYPES.BUY_IT_NOW}>Buy it now</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="adType">Price</label>
              <input
                className="form-control"
                name="price"
                type="number"
                min={0}
                value={newItem.price}
                onChange={this.onValueChanged}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adType">End date</label>
              <input
                className="form-control"
                name="endDate"
                type="text" // date
                value={newItem.endDate}
                onChange={this.onValueChanged}
              />
            </div>

            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
