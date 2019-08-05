import React, { Component } from 'react'

const FormTextField = props => {
  return(
      <input
        type = "text"
        name={props.name}
        size = "10"
      />
  )
}

export default FormTextField
