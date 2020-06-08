import ShallowRenderer  from "react-test-renderer/shallow";
import React from "react";
import Header from "../../components/Header";
import { render } from "react-dom";

test("should render header correctly", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Header />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});