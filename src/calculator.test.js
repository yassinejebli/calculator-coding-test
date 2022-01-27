import moment from "moment";
import { Calculator } from "./calculator";
import { AD_TYPES, USER_TYPES } from "./constants";

describe("Calculator", () => {
  it("Returns the correct discount", () => {
    const calc = new Calculator();
    const discount = calc.getDiscount(
      USER_TYPES.COMPANY,
      moment().format("YYYY-MM-DD")
    );

    expect(discount).toBe(15);
  });

  it("Returns the correct ad cost", () => {
    const calc = new Calculator();
    const adCost = calc.getAdCost(AD_TYPES.BUY_IT_NOW);

    expect(adCost).toBe(35);
  });

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

  it("Throws an error when `userType` value is unknown", () => {
    const calc = new Calculator();
    try {
      const fee = calc.getFee({
        userType: USER_TYPES.PERSON,
        adType: 2,
        price: 10,
        endDate: moment().format("YYYY-MM-DD"),
      });
    } catch (e) {
      expect(e.message).toBe("Unknown ad cost type");
    }
  });
});
