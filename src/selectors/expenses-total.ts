import { Expense } from "../@types/expenseTypes";

export default (expenses: Expense[]) => {
  return expenses.map(_ => _.amount).reduce((a: number, c: number) => (a + c), 0);
}
