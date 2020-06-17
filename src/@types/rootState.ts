import { ExepenseItemType } from "./expenseTypes";
import { FiltersType, SetTextFilterAction, SortByDateFilterAction, SortByAmountFilterAction, SetStartDateFilterAction, SetEndDateFilterAction } from "./filterTypes";
import { ConnectedProps, connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import { History, LocationState } from "history";
import { Moment } from "moment";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";
export type RootState = {
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

interface DispatchProps {
  setTextFilter: (text?: string) => SetTextFilterAction,
  sortByDate: () => SortByDateFilterAction,
  sortByAmount: () => SortByAmountFilterAction,
  setStartDate: (startDate: Moment) => SetStartDateFilterAction,
  setEndDate: (endDate: Moment) => SetEndDateFilterAction
};

const mapDispatchToProps = (dispatch: (arg0: { type: "SET_TEXT_FILTER" | "SORT_BY_DATE" | "SORT_BY_AMOUNT" | "SET_START_DATE" | "SET_END_DATE"; text?: string; startDate?: Moment; endDate?: Moment; }) => any) => ({
  setTextFilter: (text?: string) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate: Moment) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate: Moment) => dispatch(setEndDate(endDate)),
});

export const connector = connect(mapStateToProps, mapDispatchToProps);