import { ExepenseItemType } from "../@types/expenseTypes";
import { FiltersType } from "../@types/filterTypes";

export default (expenses: ExepenseItemType[], { text, sortBy, startDate, endDate }: FiltersType): ExepenseItemType[] => {
  return expenses.filter((expense: ExepenseItemType) => {
    const startDateMatch: boolean = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch: boolean = typeof endDate !== 'number' || expense.createdAt <= endDate;
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