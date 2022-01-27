import { Calculator } from './calculator';
import moment from 'moment';

describe("Calculator", () => {
  it('Can calculate fee', () => {
    const calc = new Calculator();
    const fee = calc.getFee({
      userType: 0,
      itemType: 0,
      price: 10,
      endDate: moment().format("YYYY-MM-DD")
    });

    expect(fee).toBe(25);
  });
});
