import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test('should return 0 if no expense', () => {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
  var total = selectExpensesTotal([expenses[0]]);
  expect(total).toBe(195);
});

test('should correctly add up multiple expenses', () => {
  const total = selectExpensesTotal(expenses); // look into map and reduce
  expect(total).toBe(114195);
});