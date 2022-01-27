import moment from 'moment';

export class Calculator {
  getFee({userType, itemType, price, endDate}) {    
    switch (userType) {
      case 0: //Normal
        if (itemType === 0) {
          //Auction
          let endDateDiscount = 0;
          const isToday = moment(endDate).isSame(moment(), 'day');
          if (isToday) {
            endDateDiscount = 10;
          }
          return price + 25 - endDateDiscount;
        } else if (itemType === 1) {
          //BuyItNow
          return price + 35 - 0;
        }
        break;
      case 1: //Company
        if (itemType === 0) {
          //Auction
          const isToday = moment(endDate).isSame(moment(), 'day');
          if (isToday) {
            return price + 25 - 15; // Enddate discount and company discount
          }

          return price + 25 - 5; // Only company discount
        } else if (itemType === 1) {
          //BuyItNow
          return price + 35 - 5;
        }
        break;
      default:
        throw new Error('Unknown user type');
    }
  }
}
