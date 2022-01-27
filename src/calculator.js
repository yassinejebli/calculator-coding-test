import moment from "moment";
import { USER_TYPES, AD_TYPES } from "./constants";

export class Calculator {
  getFee({ userType, itemType, price, endDate }) {
    const typeAdCost = this.getAdCost(itemType);
    const discount = this.getDiscount(userType, endDate);
    return price + typeAdCost - discount;
  }

  getAdCost(itemType) {
    switch (itemType) {
      case AD_TYPES.AUCTION:
        return 25;
      case AD_TYPES.BUY_IT_NOW:
        return 35;
      default:
        throw new Error("Unknown ad cost type");
    }
  }

  getDiscount(userType, date) {
    let discount = 0;
    const isCompany = userType === USER_TYPES.COMPANY;
    const isToday = moment(date).isSame(moment(), "day");
    if (isCompany) discount = 5;
    if (isToday) discount += 10;

    return discount;
  }
}
