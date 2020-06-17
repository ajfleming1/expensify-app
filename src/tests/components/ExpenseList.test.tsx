import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";
import { getMockDispatchProps } from "../__mocks__/getMockRouterProps";
let mockDispatchProps = getMockDispatchProps(null);
test("should render ExpenseList with expenses", () => {
    const wrapper = shallow(
        <ExpenseList
            filters={undefined}
            history={undefined}
            expenses={expenses}
            {...mockDispatchProps}
        />);

    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
    const wrapper = shallow(
        <ExpenseList
            filters={undefined}
            history={undefined}
            expenses={[]}
            {...mockDispatchProps}
        />);

    expect(wrapper).toMatchSnapshot();
});