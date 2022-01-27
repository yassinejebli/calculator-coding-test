import React, { Component } from "react";
import moment from "moment";
import Header from "./Header";
import Register from "./Register";
import Items from "./Items";
import { Calculator } from "./calculator";
import "./App.css";

const calc = new Calculator();
class App extends Component {
  constructor(props) {
    super(props);

    // global state
    this.state = {
      items: [],
      newItem: {
        adType: -1,
        userType: -1,
        price: 100,
        endDate: moment().format("YYYY-MM-DD"),
      },
    };
  }

  // Generic change handler
  onValueChanged = (event) => {
    const { newItem } = this.state;
    const valueShouldBeParsedToNumber = [
      "adType",
      "userType",
      "price",
    ].includes(event.target.name);

    this.setState({
      newItem: {
        ...newItem,
        [event.target.name]: valueShouldBeParsedToNumber
          ? Number(event.target.value)
          : event.target.value,
      },
    });
  };

  // TODO: form validation
  onNewItemSubmit = (event) => {
    event.preventDefault();

    const { newItem, items } = this.state;

    // save the new item
    this.setState({
      newItem: {
        adType: -1,
        userType: -1,
        price: 100,
        endDate: moment().format("YYYY-MM-DD"),
      },
      // append the new item
      items: [...items, newItem],
    });
  };
  render() {
    const { newItem, items } = this.state;
    // Removed total from state because it can be calculated
    const total = items.reduce((prev, curr) => prev + calc.getFee(curr), 0);

    return (
      <div className="App">
        <Header />
        <div className="App-page row">
          <div className="col-md-6 col-12">
            <p>Total fees: {total} </p>
            <Register
              item={newItem}
              onNewItemSubmit={this.onNewItemSubmit}
              onValueChanged={this.onValueChanged}
            />
          </div>
          <div className="col-md-6 col-12">
            <Items />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
