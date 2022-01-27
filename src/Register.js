import React from "react";
import PropTypes from "prop-types";
import { AD_TYPES, USER_TYPES } from "./constants";

// TODO: prop types
export default function Register({ item, onValueChanged, onNewItemSubmit }) {
  return (
    <form className="New-item-form" onSubmit={onNewItemSubmit}>
      <div className="form-group">
        <label htmlFor="userType">You are</label>
        <select
          className="form-control"
          name="userType"
          id="userType"
          value={item.userType}
          onChange={onValueChanged}
        >
          <option value="-1">Select</option>
          <option value={USER_TYPES.PERSON}>Person</option>
          <option value={USER_TYPES.COMPANY}>Company</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="adType">Ad Type</label>
        <select
          className="form-control"
          name="adType"
          id="adType"
          value={item.adType}
          onChange={onValueChanged}
        >
          <option value="-1">Select </option>
          <option value={AD_TYPES.AUCTION}>Auction</option>
          <option value={AD_TYPES.BUY_IT_NOW}>Buy it now</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          className="form-control"
          name="price"
          id="price"
          type="number"
          min={0}
          value={item.price}
          onChange={onValueChanged}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End date</label>
        <input
          className="form-control"
          name="endDate"
          id="endDate"
          type="text" // date
          value={item.endDate}
          onChange={onValueChanged}
        />
      </div>

      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  );
}

Register.propTypes = {
  item: PropTypes.shape({
    adType: PropTypes.number.isRequired,
    userType: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  onValueChanged: PropTypes.func.isRequired,
  onNewItemSubmit: PropTypes.func.isRequired,
};
