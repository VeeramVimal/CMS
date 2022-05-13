import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import TestElement from './testElement';

afterEach(cleanup);

it("Increase count" , () => {
    const { getByTestId } = render(<TestElement/>);
    fireEvent.click(getByTestId('button-up'));
    expect(getByTestId('counted')).toHaveTextContent('5');
});

it("decreses count" , () => {
    const { getByTestId } = render(<TestElement/>);
    fireEvent.click(getByTestId('button-down'));
    expect(getByTestId('counted')).toHaveTextContent('-1');
})