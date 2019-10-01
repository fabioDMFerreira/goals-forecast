import Balance from "./Balance";
import Forecast from "./Forecast";
import Transaction from "./Transaction";
import { monthDiff, sumMonths, isMonthsIntervalInGroup, isDateIntervalInGroup } from "./utils";
import calculateBalance from "./Balance/calculateBalance";
import roundDecimal from "utils/roundDecimal";

export default (forecast: Forecast, transactions: Transaction[]): Balance[] => {

  const balances: Balance[] = [];

  const balanceMonths: number = monthDiff(forecast.startDate, forecast.endDate);

  let cumulativeValue: number = forecast.initialValue;

  for (let i = 0; i < balanceMonths; i++) {
    const balanceDate: Date = sumMonths(forecast.startDate, i);

    const monthTransactions: Transaction[] =
      transactions.filter(
        transaction => {
          if (transaction.interval > 1) {
            return isMonthsIntervalInGroup(transaction.startDate, transaction.interval, transaction.particles, balanceDate);
          } else {
            return isDateIntervalInGroup(transaction.startDate, transaction.endDate, balanceDate)
          }
        }
      );

    const balance = calculateBalance(monthTransactions);
    cumulativeValue += balance.balance;
    balance.date = balanceDate;
    balance.actualValue = roundDecimal(cumulativeValue);
    balances.push(balance);
  }

  return balances;
}