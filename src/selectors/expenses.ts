import { Expense } from "../@types/expenseTypes";
import { FiltersType } from "../@types/filterTypes";
import moment from "moment";

export default (expenses: Expense[], { text, sortBy, startDate, endDate }: FiltersType): Expense[] => {
  return expenses.filter((expense: Expense) => {
    const createAtMoment = moment(expense.createdAt);
    const startDateMatch: boolean = startDate ? startDate.isSameOrBefore(createAtMoment, "day") : true;
    const endDateMatch: boolean = endDate ? endDate.isSameOrAfter(createAtMoment, "day") : true;
    const textMatch: boolean = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a: Expense, b: Expense) => {
    switch (sortBy) {
      case "date":
        return a.createdAt < b.createdAt ? 1 : -1;
      case "amount":
        return a.amount < b.amount ? 1 : -1;
    }
  });
}