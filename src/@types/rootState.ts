import { ExepenseItemType } from "./expenseTypes";
import { FiltersType } from "./filterTypes";
import { ConnectedProps, connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import { History, LocationState } from "history";
type RootState = {
  expenses: ExepenseItemType[],
  filters: FiltersType,
  history: History<LocationState>
};

export type Props = ConnectedProps<typeof connector>;
const mapStateToProps = (state: RootState) => (
  {
    expenses: selectExpenses(state.expenses, state.filters),
    filters: state.filters,
    history: state.history
  }
);

export const connector = connect(mapStateToProps);