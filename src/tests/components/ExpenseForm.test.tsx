import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import ExpenseForm from "../../components/ExpenseForm";
import moment, { Moment } from "moment";
import { SingleDatePicker } from "react-dates";
test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm onSubmit={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
    const wrapper = shallow<{ error: string }>(<ExpenseForm onSubmit={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate('submit', {
        preventDefault: () => { }
    });

    expect(wrapper.state().error.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
    const value = "New Description";
    const wrapper = shallow<{ description: string }>(<ExpenseForm onSubmit={jest.fn()} />);
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().description).toBe(value);
});

test("should set note on text area change", () => {
    const value = "New Note";
    const wrapper = shallow<{ note: string }>(<ExpenseForm onSubmit={jest.fn()} />);
    wrapper.find("textarea").simulate("change", {
        target: { value }
    });

    expect(wrapper.state().note).toBe(value);
});

test("should set amount if valid input", () => {
    // 23.50
    const value = "23.50";
    const wrapper = shallow<{ amount: string }>(<ExpenseForm onSubmit={jest.fn()} />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().amount).toBe(value);
});

test("should not set amount if invalid input", () => {
    const value = "12.122";
    const wrapper = shallow<{ amount: string }>(<ExpenseForm onSubmit={jest.fn()} />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });

    expect(wrapper.state().amount).toBe("");
});

test("should call onSubmit prop from valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow<{ error: string }>(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find("form").simulate('submit', {
        preventDefault: () => { }
    });

    expect(wrapper.state().error).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    });
});

test("should set new on date change", () => {
    const now = moment();
    const wrapper = shallow<{ createdAt: Moment }>(<ExpenseForm onSubmit={jest.fn()} />)
    wrapper.find(SingleDatePicker).prop("onDateChange")(now);
    expect(wrapper.state().createdAt).toEqual(now);
});

test("should set calendar focus on change", () => {
    const focused = true;
    const wrapper = shallow<{ calendarFocused: boolean }>(<ExpenseForm onSubmit={jest.fn()} />);
    wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused });
    expect(wrapper.state().calendarFocused).toBe(true);
});