import React, {Component} from 'react';
import './App.css';
import {Calculator} from './calculator';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0,
      newItem: {
        itemType: -1,
        userType: -1,
        price: 100,
        endDate: moment().format("YYYY-MM-DD"),
      },
    };
  }

  onItemTypeChange = event => {
    const {newItem} = this.state;

    this.setState({
      newItem: {
        userType: newItem.userType,
        price: newItem.price,
        endDate: newItem.endDate,
        itemType: parseInt(event.target.value, 10),
      }
    });
  };

  onUserTypeChanged = event => {
    const {newItem} = this.state;

    this.setState({
      newItem: {
        itemType: newItem.itemType,
        price: newItem.price,
        endDate: newItem.endDate,
        userType: parseInt(event.target.value, 10),
      }
    });
  };

  onNewItemSubmit = event => {
    event.preventDefault();

    const calc = new Calculator();
    const {newItem} = this.state;
    const fee = calc.getFee(newItem);

    // update total
    this.setState({
      total: this.state.total + fee,
    });
  };

  onPriceChanged = event => {
    const {newItem} = this.state;

    this.setState({
      newItem: {
        itemType: newItem.itemType,
        userType: newItem.userType,
        endDate: newItem.endDate,
        price: event.target.value
      }
    });
  };

  onEndDateChanged = event => {
    const {newItem} = this.state;

    this.setState({
      newItem: {
        itemType: newItem.itemType,
        userType: newItem.userType,
        price: newItem.price,
        endDate: event.target.value,
      }
    });
  };

  render() {
    const {newItem, total} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Solid Fee Calculator</h1>
        </header>
        <div className="App-page">
          <h2>Items</h2>

          <p>Total fees: {total} </p>

          <h3>Register new item</h3>
          <form className="New-item-form" onSubmit={this.onNewItemSubmit}>
            <div className="form-group">
              <label>You are</label>
              <select
                className="form-control"
                id="itemType"
                defaultValue="-1"
                onChange={this.onUserTypeChanged}>
                <option value="-1">Select</option>
                <option value="0">Person</option>
                <option value="1">Company</option>
              </select>
            </div>

            <div className="form-group">
              <label>Item Type</label>
              <select
                className="form-control"
                id="itemType"
                defaultValue="-1"
                onChange={this.onItemTypeChange}>
                <option value="-1">Select </option>
                <option value="0">Auction</option>
                <option value="1">Buy it now</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="itemType">Price</label>
              <input className="form-control" type="number" value={newItem.price} onChange={this.onPriceChanged}  />
            </div>

            <div className="form-group">
              <label htmlFor="itemType">End date</label>
              <input className="form-control" type="text" value={newItem.endDate} onChange={this.onEndDateChanged}  />
            </div>

            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
