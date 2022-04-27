import React, { useState } from "react"
import { Label, FormGroup } from "reactstrap"
import Flatpickr from "react-flatpickr"
import Proptypes from 'prop-types'

const CustomDatePicker = (props) => {
  const { label, value, setValue, initialVal, setInitialVal, isMandatory, name, max, minD, minTar, disabled, dateType, className } = props
  console.log("props=====", props)
  const [key, setKey] = useState(name)
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [name]: e.toString() }))
    setInitialVal((prev) => ({ ...prev, [name]: false }))
    if (e === []) {
      setInitialVal((prev) => ({ ...prev, [name]: `${name} is required` }))
    }
    setKey(name)
  }

  return (
    <FormGroup className="custom-input">
      {label && <Label for="hf-picker">{label}{isMandatory ? <span className="text-danger">*</span> : null}</Label>}
      <Flatpickr
        disabled={disabled}
        style={disabled ? { backgroundColor: '#D7DED9' } : null}
        value={new Date(value)}
        // id="hf-picker"
        className={`${className} form-control border border-secondary ${!value.value && initialVal[key] ? "border-danger" : "border-secondary"}`}
        onChange={date => handleChange(date)}
        options={{
          // altInput: true,
          // altFormat: "F j, Y",
          // disable: ["2021-11-11"],
          // defaultDate: ["2021-11-11"],
          mode: dateType === undefined ? "single" : dateType,
          dateFormat: ' d-m-y',
          minDate: minD ? new Date(minD) : minTar ? new Date(minTar) : "",
          maxDate: max ? new Date() : ''
        }}
      />
      {!value.value && initialVal[key] && (
        <div className="error">{initialVal[key]}</div>
      )}
    </FormGroup>
  )
}

export default CustomDatePicker

CustomDatePicker.propTypes = {
  value: Proptypes.instanceOf(Date),
  label: Proptypes.string,
  setValue: Proptypes.func,
  className: Proptypes.string,
  dateType: Proptypes.string,
  className: Proptypes.string
}