import React, { Component } from "react"
import { Link } from "react-router-dom"
import FormTextField from "../components/FormTextField"
import WikiTile from "../components/WikiTile"

class GameQuestionFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wikiClicked: false,
      wikiObject: {},
      questionObject: {}
    }

  }

  componentDidMount(){
    let questionUrl = this.props.match.url
    let fetchUrl = "/api/v1" + questionUrl

    fetch(`${fetchUrl}`)
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
      .then(questionHash => {
        let question = {question: questionHash.question_text, answer: questionHash.answer}
        let wiki = {image: questionHash.wiki_image, intro: questionHash.wiki_intro}
        this.setState({ questionObject: question, wikiObject: wiki })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    return(
      <div className="question-show">
        <h1>{this.state.questionObject.question}</h1>
        <form>
          <FormTextField
            label="Answer"
            name="Answer"
          />
          <div className="button-group">
            <input className="form-button submit" type="submit" value="Submit" />
          </div>
        </form>

        <h4>ANSWER: {this.state.questionObject.answer}</h4>


        <WikiTile
          wikiIntro = {this.state.wikiObject.intro}
          wikiImage = {this.state.wikiObject.image}
        />
      </div>
    )
  }

}
export default GameQuestionFormContainer
