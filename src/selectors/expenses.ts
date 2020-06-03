import { ExepenseItemType } from "../@types/expenseTypes";
import { FiltersType } from "../@types/filterTypes";
import moment from "moment";

export default (expenses: ExepenseItemType[], { text, sortBy, startDate, endDate }: FiltersType): ExepenseItemType[] => {
  return expenses.filter((expense: ExepenseItemType) => {
    const createAtMoment = moment(expense.createdAt);
    const startDateMatch: boolean = startDate ? startDate.isSameOrBefore(createAtMoment, "day") : true;
    const endDateMatch: boolean = endDate ? endDate.isSameOrAfter(createAtMoment, "day") : true;
    const textMatch: boolean = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a: ExepenseItemType, b: ExepenseItemType) => {
    if (sortBy === "date") {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else if(sortBy === "amount" ){
      return a.amount < b.amount ? 1 : -1;
    }
  });
}