import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import GameContainer from '../container/GameContainer'
import GameQuestionFormContainer from '../container/GameQuestionFormContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/games/:id" component={GameContainer} />
        <Route exact path="/games/:id/questions/:id" component={GameQuestionFormContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
