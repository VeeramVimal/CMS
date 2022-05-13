import React, { useState } from "react";
import { Label } from "reactstrap";

export function TestChecked ({lableOn, lableOff}) {
const [ isChecked, setIsChecked ] = useState(false);

const handleChange = () => {
setIsChecked(!isChecked)
}
    return(
        <>
        <Label>
            <input type="checkbox" checked={isChecked} onChange={handleChange}/>
            {isChecked ? lableOn : lableOff }
        </Label>
        </>
    )
}
