import React, { useState } from 'react';
function TestElement() {
const[count, setCount] = useState(0);
    return(
        <>
        <h1 data-testid = 'counted'>{count}</h1>
        <button data-testid = 'button-up' onClick={() => setCount(count + 1)}>up</button>
        <button data-testid = 'button-down' onClick={() => setCount(count - 1)}>down</button>
        </>
    )
}
export default TestElement