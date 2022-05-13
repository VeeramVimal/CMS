import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { TestChecked } from "./testChecked";

afterEach(cleanup);

it("if button will clicked" , async () => {
    const { queryByLabelText, getByLabelTest } = render(
        <TestChecked lableOn='on' lableOff='off'/>
    );
    await waitFor(() => expect(queryByLabelText(/off/i)).toBeTruthy());
    fireEvent.click(getByLabelTest(/off/i));
    await waitFor(() => expect(queryByLabelText(/on/i)).toBeTruthy());
});