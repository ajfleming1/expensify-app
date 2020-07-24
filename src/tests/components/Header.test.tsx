import React, { Component } from "react";
import { Header } from "../../components/Header";
import { shallow, ShallowWrapper } from "enzyme";
import { getMockRouterProps } from "../__mocks__/getMockRouterProps";

const routerProps = getMockRouterProps<typeof Header>(null);


test("should render header correctly", () => {
    let startLogout: () => void = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    expect(wrapper).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
    let startLogout: () => void = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate("click");
    expect(startLogout).toHaveBeenCalled();
  });