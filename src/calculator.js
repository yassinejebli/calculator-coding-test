import moment from "moment";
import { USER_TYPES, AD_TYPES } from "./constants";

export class Calculator {
  /**
   * Get fees
   * @example
   * // returns 35
   * this.getFee({0, 0, 10, "2030-12-30"});
   * @returns {Number}
   */
  getFee({ userType, adType, price, endDate }) {
    const adCost = this.getAdCost(adType);
    const discount = this.getDiscount(userType, endDate);
    return price + adCost - discount;
  }

  /**
   * Get ad cost based on the selected adType
   * @example
   * // returns 25
   * this.getAdCost(0);
   * @returns {Number}
   */
  getAdCost(adType) {
    switch (adType) {
      case AD_TYPES.AUCTION:
        return 25;
      case AD_TYPES.BUY_IT_NOW:
        return 35;
      default:
        throw new Error("Unknown ad cost type");
    }
  }

  /**
   * Get discount by user type
   * @example
   * // returns 5
   * this.getDiscount(1,"2030-12-30");
   * @returns {Number} Returns the correct discount
   */
  getDiscount(userType, date) {
    let discount = 0;
    const isCompany = userType === USER_TYPES.COMPANY;
    const isToday = moment(date).isSame(moment(), "day");
    //Company users get a discount of 5 when they publish an ad
    if (isCompany) discount = 5;
    //If an ad ends today there's a discount of 10
    if (isToday) discount += 10;

    return discount;
  }
}
