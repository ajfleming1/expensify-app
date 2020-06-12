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
});

test("should render error for invalid form submission", () => {
    const wrapper = shallow<{ error: string }>(<ExpenseForm onSubmit={undefined} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate('submit', {
        preventDefault: () => { }
    });

    expect(wrapper.state().error.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
    const value = "New Description";
    const wrapper = shallow<{ description: string }>(<ExpenseForm onSubmit={undefined} />);
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().description).toBe(value);
});

test("should set note on text area change", () => {
    const value = "New Note";
    const wrapper = shallow<{ note: string }>(<ExpenseForm onSubmit={undefined} />);
    wrapper.find("textarea").simulate("change", {
        target: { value }
    });

    expect(wrapper.state().note).toBe(value);
});

test("should set amount if valid input", () => {
    // 23.50
    const value = "23.50";
    const wrapper = shallow<{ amount: string }>(<ExpenseForm onSubmit={undefined} />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().amount).toBe(value);
});

test("should not set amount if invalid input", () => {
    // 12.122
    const value = "12.122";
    const wrapper = shallow<{ amount: string }>(<ExpenseForm onSubmit={undefined} />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().amount).toBe("");
});