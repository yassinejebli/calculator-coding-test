import { Calculator } from "./calculator";
import { AD_TYPES, USER_TYPES } from "./constants";
import moment from "moment";

describe("Calculator", () => {
  it("Can calculate fee", () => {
    const calc = new Calculator();
    const fee = calc.getFee({
      userType: USER_TYPES.PERSON,
      adType: AD_TYPES.AUCTION,
      price: 10,
      endDate: moment().format("YYYY-MM-DD"),
    });

    expect(fee).toBe(25);
  });
});
