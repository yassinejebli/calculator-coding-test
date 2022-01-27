import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Register from "./Register";
import { AD_TYPES, USER_TYPES } from "./constants";

describe("Register", () => {
  it("Renders item values correctly in Register component", () => {
    const newItem = {
      adType: AD_TYPES.AUCTION,
      userType: USER_TYPES.COMPANY,
      price: 100,
      endDate: "2022-12-12",
    };
    const onValueChanged = jest.fn();
    render(<Register onValueChanged={onValueChanged} item={newItem} />);
    const userTypeSelect = screen.getByLabelText("You are");
    const adTypeSelect = screen.getByLabelText("Ad Type");
    const endDateInput = screen.getByLabelText("End date");
    const priceInput = screen.getByLabelText("Price");

    expect(userTypeSelect.value).toBe("1");
    expect(adTypeSelect.value).toBe("0");
    expect(endDateInput.value).toBe("2022-12-12");
    expect(priceInput.value).toBe("100");
  });

  it("Calls onValueChanged handler when changing price value", () => {
    const newItem = {
      adType: AD_TYPES.AUCTION,
      userType: USER_TYPES.COMPANY,
      price: 0,
      endDate: "2022-12-12",
    };
    const onValueChanged = jest.fn();
    render(<Register onValueChanged={onValueChanged} item={newItem} />);
    const priceInput = screen.getByLabelText("Price");

    fireEvent.change(priceInput, { target: { value: "99" } });
    expect(onValueChanged).toHaveBeenCalled();
  });
});
