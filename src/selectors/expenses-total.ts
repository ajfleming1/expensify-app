import { ExepenseItemType } from "../@types/expenseTypes";

export default (expenses: ExepenseItemType[]) => {
  return expenses.map(_ => _.amount).reduce((a: number, c: number) => (a + c), 0);
}
