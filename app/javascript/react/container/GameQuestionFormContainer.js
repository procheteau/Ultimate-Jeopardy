import React, { Component } from "react"
import { Link } from "react-router-dom"
import FormTextField from "../components/FormTextField"
import WikiTile from "../components/WikiTile"

class GameQuestionFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAnswer: '',
      answerSubmitted: false,
      answerCheck: '',
      wikiObject: {},
      questionObject: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.addScore = this.addScore.bind(this)
  }

  handleFormSubmit(event){
    event.preventDefault();
    let scorePayload, checkAnswer
    if(this.state.answerSubmitted === false){
      if(this.state.userAnswer.toUpperCase() === this.state.questionObject.answer){
        checkAnswer = "Correct";
        this.setState({answerSubmitted: true, answerCheck: checkAnswer})
        scorePayload = {value: this.state.questionObject.value, answerCheck: checkAnswer, question_id: this.props.match.params.id }
        this.addScore(scorePayload)
      } else {
          checkAnswer = "Wrong";
          this.setState({answerSubmitted: true, answerCheck: checkAnswer})
          scorePayload = {value: 0, answerCheck: checkAnswer, question_id: this.props.match.params.id}
          this.addScore(scorePayload)
        }
    }
  }


  addScore(scorePayload){
    let questionUrl = this.props.match.url
    let gameUrl = questionUrl.split("/").splice(0,3).join("/")
    let fetchUrl = "/api/v1" + gameUrl
    fetch(`${fetchUrl}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(scorePayload),
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleAnswerChange(event){
    this.setState({userAnswer: event.target.value})
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
        let question = {question: questionHash.question_text, answer: questionHash.answer, value: questionHash.value}
        let wiki = {image: questionHash.wiki_image, intro: questionHash.wiki_intro}
        this.setState({ questionObject: question, wikiObject: wiki })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let questionUrl = this.props.match.url
    let gameUrl = questionUrl.split("/").splice(0,3).join("/")
    let answerClass = "answer-hide"
    let wikiClass = "wiki-hide"

    if(this.state.answerSubmitted === true){
      if(this.state.answerCheck === "Wrong"){
        answerClass = "answer-wrong fade-in one"
        wikiClass = "wiki-box fade-in one"
      } else {
        answerClass = "answer-correct fade-in one"
        wikiClass = "wiki-box fade-in one"
      }
    }

    return(
      <div className="question-show">
        <Link to={gameUrl}>
          <div className="button">Back</div>
        </Link>
        <h3>{this.state.questionObject.question}</h3>
        <form onSubmit={this.handleFormSubmit}>
          <FormTextField
            name="Answer"
            handlerFunction={this.handleAnswerChange}
            content={this.state.userAnswer}
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
