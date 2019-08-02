import React, { Component } from "react"
import { Link } from "react-router-dom"
import GameQuestionFormContainer from "./GameQuestionFormContainer"
import GameCategoryTile from "../components/GameCategoryTile"
import GameQuestionValueTile from "../components/GameQuestionValueTile"

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  componentDidMount(){

  }


  render(){


    return(
      <div className="game">
        <div className="jeopardy-table">
          <table>
              <tr>
                <th><p>Category 1</p></th>
                <th><p>Category 2</p></th>
                <th><p>Category 3</p></th>
                <th><p>Category 4</p></th>
                <th><p>Category 5</p></th>
                <th><p>Category 6</p></th>
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
