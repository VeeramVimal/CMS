import React from "react"
import { FormGroup, Input, Label } from "reactstrap"
import Proptypes from 'prop-types'

// import
const CustomCheckbox = ({ checked, value, onChange, label, style, labelStyle }) => {
    return (
        <FormGroup check inline style={style}>
            <Input
                id={"checkbox"}
                type="checkbox"
                checked={checked}
                value={value}
                onChange={() => onChange()}
                style={{ width: '15px', height: '15px', marginRight: '12px' }}
            />
            <Label for={"checkbox"} check style={labelStyle} onClick={() => onChange()}>
                {label}
            </Label>
        </FormGroup>
    )
}

export default CustomCheckbox

CustomCheckbox.PropTypes = {
    checked: Proptypes.bool,
    value: Proptypes.bool,
    onChange: Proptypes.func,
    label: Proptypes.string,
    style: Proptypes.string,
    labelStyle: Proptypes.string
}