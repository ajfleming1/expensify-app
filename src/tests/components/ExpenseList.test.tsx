import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
    const wrapper = shallow(
        <ExpenseList
            dispatch={undefined}
            filters={undefined}
            history={undefined}
            expenses={expenses}
        />);

        expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
    const wrapper = shallow(
        <ExpenseList
            dispatch={undefined}
            filters={undefined}
            history={undefined}
            expenses={[]}
        />);

        expect(wrapper).toMatchSnapshot();
});