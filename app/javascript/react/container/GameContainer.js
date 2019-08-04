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
      gameQuestionObjects: []
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
        debugger
        let categories = gameObject.GameCategories.categories
        let questions = gameObject.GameQuestions.questions
        this.setState({ gameCompleted: gameObject.completed, gameCategoryObjects: categories, gameQuestionObjects: questions })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let categories

    if (this.state.CategoryObjects) {
      categories = this.state.CategoryObjects.map(category => {
        return(<th><p>category.name</p></th>)
      })
    }

    return(
      <div className="game">
        <div className="jeopardy-table">
          <table>
              <tr>
                {categories}
              </tr>
              <tr>
                <td className="value fade-in one"><p>$200</p></td>
                <td className="value fade-in one"><p>$200</p></td>
                <td className="value fade-in one"><p>$200</p></td>
                <td className="value fade-in one"><p>$200</p></td>
                <td className="value fade-in one"><p>$200</p></td>
                <td className="value fade-in one"><p>$200</p></td>
              </tr>
              <tr>
                <td className="value fade-in two"><p>$400</p></td>
                <td className="value fade-in two"><p>$400</p></td>
                <td className="value fade-in two"><p>$400</p></td>
                <td className="value fade-in two"><p>$400</p></td>
                <td className="value fade-in two"><p>$400</p></td>
                <td className="value fade-in two"><p>$400</p></td>
              </tr>
              <tr>
                <td className="value fade-in three"><p>$600</p></td>
                <td className="value fade-in three"><p>$600</p></td>
                <td className="value fade-in three"><p>$600</p></td>
                <td className="value fade-in three"><p>$600</p></td>
                <td className="value fade-in three"><p>$600</p></td>
                <td className="value fade-in three"><p>$600</p></td>
              </tr>
              <tr>
                <td className="value fade-in four"><p>$800</p></td>
                <td className="value fade-in four"><p>$800</p></td>
                <td className="value fade-in four"><p>$800</p></td>
                <td className="value fade-in four"><p>$800</p></td>
                <td className="value fade-in four"><p>$800</p></td>
                <td className="value fade-in four"><p>$800</p></td>
              </tr>
              <tr>
                <td className="value fade-in five"><p>$1000</p></td>
                <td className="value fade-in five"><p>$1000</p></td>
                <td className="value fade-in five"><p>$1000</p></td>
                <td className="value fade-in five"><p>$1000</p></td>
                <td className="value fade-in five"><p>$1000</p></td>
                <td className="value fade-in five"><p>$1000</p></td>
              </tr>
          </table>
        </div>
        <div className="score">
          <p>Score</p>
          <div className="score-box">
            <p>$10,000</p>
          </div>
        </div>
      </div>
    )
  }

}
export default GameContainer
