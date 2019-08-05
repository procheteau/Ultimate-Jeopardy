import React, { Component } from "react"
import { Link } from "react-router-dom"
import FormTextField from "../components/FormTextField"
import WikiTile from "../components/WikiTile"

class GameQuestionFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerSubmitted: false,
      wikiObject: {},
      questionObject: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(event){
    event.preventDefault();
    if(this.state.answerSubmitted === false){
      this.setState({answerSubmitted: true})
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
    let answerClass = "answer-hide"
    let wikiClass = "wiki-hide"
    if(this.state.answerSubmitted == true){
      answerClass = "answer fade-in one"
      wikiClass = "wiki-box fade-in one"
    }

    return(
      <div className="question-show">
        <h3>{this.state.questionObject.question}</h3>
        <form onSubmit={this.handleFormSubmit}>
          <FormTextField
            name="Answer"
          />
          <div className="button-group">
            <input className="form-button submit" type="submit" value="Submit" />
          </div>
        </form>

        <h4 className={answerClass}>ANSWER: {this.state.questionObject.answer}</h4>

        <WikiTile
          wikiIntro = {this.state.wikiObject.intro}
          wikiImage = {this.state.wikiObject.image}
          wikiClass = {wikiClass}
        />
      </div>
    )
  }

}
export default GameQuestionFormContainer
