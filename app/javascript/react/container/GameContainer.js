import React, { Component } from "react"
import { Link } from "react-router-dom"
import GameQuestionFormContainer from "./GameQuestionFormContainer"
import GameCategoryTile from "../components/GameCategoryTile"
import GameQuestionValueTile from "../components/GameQuestionValueTile"

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameCompleted: false,
      gameCategoryObjects: [],
      gameQuestionObjects: [],
      gameScore: 0
    }
  }

  componentDidMount(){
    let gameId = this.props.match.params.id
    fetch(`/api/v1/games/${gameId}`)
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(gameObject => {
        let categories = gameObject.game.categories
        let questions = gameObject.game.questions
        this.setState({ gameCompleted: gameObject.game.completed, gameScore: gameObject.game.score,gameCategoryObjects: categories, gameQuestionObjects: questions })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let categories
    let rowOne, rowTwo, rowThree, rowFour, rowFive
    let gameId = this.props.match.params.id
    let playerScore = "$"+this.state.gameScore

    if (this.state.gameCategoryObjects.length !== 0) {
      categories = this.state.gameCategoryObjects.map((category,index) => {
        return(<th key={index}><p>{category.name}</p></th>)
      })
    }

    if (this.state.gameQuestionObjects.length !== 0) {
      let values200 = this.state.gameQuestionObjects.filter(questionObject => questionObject.value === 200)
      rowOne = values200.map((question,index) => {
        let dollarValue = "$"+question.value
        let questionURL = `/games/${gameId}/questions/${question.id}`
        return(<td className="value fade-in one" key={index}><a href={questionURL}><p>{dollarValue}</p></a></td>)
      })
    }

    if (this.state.gameQuestionObjects.length !== 0) {
      let values400 = this.state.gameQuestionObjects.filter(questionObject => questionObject.value === 400)
      rowTwo = values400.map((question,index) => {
        let dollarValue = "$"+question.value
        let questionURL = `/games/${gameId}/questions/${question.id}`
        return(<td className="value fade-in two" key={index}><a href={questionURL}><p>{dollarValue}</p></a></td>)
      })
    }

    if (this.state.gameQuestionObjects.length !== 0) {
      let values600 = this.state.gameQuestionObjects.filter(questionObject => questionObject.value === 600)
      rowThree = values600.map((question,index) => {
        let dollarValue = "$"+question.value
        let questionURL = `/games/${gameId}/questions/${question.id}`
        return(<td className="value fade-in three" key={index}><a href={questionURL}><p>{dollarValue}</p></a></td>)
      })
    }

    if (this.state.gameQuestionObjects.length !== 0) {
      let values800 = this.state.gameQuestionObjects.filter(questionObject => questionObject.value === 800)
      rowFour = values800.map((question,index) => {
        let dollarValue = "$"+question.value
        let questionURL = `/games/${gameId}/questions/${question.id}`
        return(<td className="value fade-in four" key={index}><a href={questionURL}><p>{dollarValue}</p></a></td>)
      })
    }

    if (this.state.gameQuestionObjects.length !== 0) {
      let values1000 = this.state.gameQuestionObjects.filter(questionObject => questionObject.value === 1000)
      rowFive = values1000.map((question,index) => {
        let dollarValue = "$"+question.value
        let questionURL = `/games/${gameId}/questions/${question.id}`
        return(<td className="value fade-in five" key={index}><a href={questionURL}><p>{dollarValue}</p></a></td>)
      })
    }

    return(
      <div className="game">
        <div className="jeopardy-table">
          <table>
            <tbody>
                <tr>
                  {categories}
                </tr>
                <tr>
                  {rowOne}
                </tr>
                <tr>
                  {rowTwo}
                </tr>
                <tr>
                  {rowThree}
                </tr>
                <tr>
                  {rowFour}
                </tr>
                <tr>
                  {rowFive}
                </tr>
              </tbody>
          </table>
        </div>
        <div className="score">
          <p>Score</p>
          <div className="score-box">
            <p>{playerScore}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default GameContainer
