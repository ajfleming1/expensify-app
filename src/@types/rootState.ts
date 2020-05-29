import { ExepenseItemType } from "./expenseTypes";
import { FiltersType } from "./filterTypes";
import { ConnectedProps, connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
type RootState = {
  expenses: ExepenseItemType[],
  filters: FiltersType
};

export type Props = ConnectedProps<typeof connector>;
const mapStateToProps = (state: RootState) => (
  {
    expenses: selectExpenses(state.expenses, state.filters)
  }
);

export const connector = connect(mapStateToProps);