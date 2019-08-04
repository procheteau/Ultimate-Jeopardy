import React, { Component } from "react"
import { Link } from "react-router-dom"
import FormTextField from "../components/FormTextField"
import WikiTile from "../components/WikiTile"

class GameQuestionFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  componentDidMount(){

  }

  render(){


    return(
      <div>
        <h1>Test!!</h1>
        <FormTextField />
        <WikiTile />
      </div>
    )
  }

}
export default GameQuestionFormContainer
