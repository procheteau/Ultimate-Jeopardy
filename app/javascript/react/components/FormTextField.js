import React, { Component } from 'react'

const FormTextField = props => {
  return(
    <label>{props.label}
      <input
        type = "text"
        name={props.name}
        size = "10"
      />
    </label>
  )
}

export default FormTextField
