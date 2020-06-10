import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import ExpenseForm from "../../components/ExpenseForm";

test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm onSubmit={undefined} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={undefined} />);
    expect(wrapper).toMatchSnapshot();
})