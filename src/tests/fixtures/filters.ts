import moment from "moment";
import { FiltersType } from "../../@types/filterTypes";

const filters: FiltersType = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const altFilters: FiltersType = {
  text: "bill",
  sortBy: "amount",
  startDate: moment(0),
  endDate: moment(0).add(3, "days")
};

export { filters, altFilters };