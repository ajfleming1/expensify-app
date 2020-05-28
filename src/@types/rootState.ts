import { ExepenseItemType } from "./expenseTypes";
import { FiltersType } from "./filterTypes";
import { ConnectedProps, connect } from "react-redux";

type RootState = {
  expenses: ExepenseItemType[],
  filters: FiltersType
};

export type Props = ConnectedProps<typeof connector>;
const mapStateToProps = (state: RootState) => (
  {
    expenses: state.expenses,
    filters: state.filters
  }
);

export const connector = connect(mapStateToProps);