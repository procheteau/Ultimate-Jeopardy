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
        let questionObjects = gameObject.game.questions
        categories.forEach((category)=>{
          let categoryQuestions = questionObjects.filter(questionObject => questionObject.category_id === category.id)
          category.questions = categoryQuestions
        })
        this.setState({ gameCompleted: gameObject.game.completed, gameScore: gameObject.game.score, gameCategoryObjects: categories})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let categories = []
    let rowOne = []
    let rowTwo = []
    let rowThree = []
    let rowFour = []
    let rowFive = []

    let gameId = this.props.match.params.id
    let playerScore = "$"+this.state.gameScore

    if (this.state.gameCategoryObjects.length !== 0) {
      this.state.gameCategoryObjects.forEach((category,index) => {
        let question200 = category.questions.filter(questionObject => questionObject.value === 200)[0];
        let question400 = category.questions.filter(questionObject => questionObject.value === 400)[0];
        let question600 = category.questions.filter(questionObject => questionObject.value === 600)[0];
        let question800 = category.questions.filter(questionObject => questionObject.value === 800)[0];
        let question1000 = category.questions.filter(questionObject => questionObject.value === 1000)[0];

        let value200 = question200.value;
        let value400 = question400.value;
        let value600 = question600.value;
        let value800 = question800.value;
        let value1000 = question1000.value;

        categories.push(<th key={index}><p>{category.name}</p></th>);

        let dollarValue200 = "$"+value200
        let questionURL200 = `/games/${gameId}/questions/${question200.id}`
        rowOne.push(<td className="value fade-in one" key={index}><a href={questionURL200}><p>{dollarValue200}</p></a></td>)

        let dollarValue400 = "$"+value400
        let questionURL400 = `/games/${gameId}/questions/${question400.id}`
        rowTwo.push(<td className="value fade-in two" key={index}><a href={questionURL400}><p>{dollarValue400}</p></a></td>)

        let dollarValue600 = "$"+value600
        let questionURL600 = `/games/${gameId}/questions/${question600.id}`
        rowThree.push(<td className="value fade-in three" key={index}><a href={questionURL600}><p>{dollarValue600}</p></a></td>)

        let dollarValue800 = "$"+value800
        let questionURL800 = `/games/${gameId}/questions/${question800.id}`
        rowFour.push(<td className="value fade-in four" key={index}><a href={questionURL800}><p>{dollarValue800}</p></a></td>)

        let dollarValue1000 = "$"+value1000
        let questionURL1000 = `/games/${gameId}/questions/${question1000.id}`
        rowFive.push(<td className="value fade-in five" key={index}><a href={questionURL1000}><p>{dollarValue1000}</p></a></td>)
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
