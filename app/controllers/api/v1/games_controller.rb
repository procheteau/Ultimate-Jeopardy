class Api::V1::GamesController < ApplicationController
skip_before_action :verify_authenticity_token

  def show
    render json: Game.find(params[:id])
  end

  def update
    score_update = JSON.parse(request.body.read)
    gameId = params[:id]
    questionId = score_update["question_id"]

    #following join table connections to identify GameQuestion to save state that
    #question has been answered for this game
    question = Question.find(questionId)
    category = question.category
    game = Game.find(gameId)
    game_category = GameCategory.find_by(game_id: gameId, category_id: category)
    game_question = GameQuestion.find_by(game_category_id: game_category, question_id: question)
    if score_update["answerCheck"] == "Correct"
      game_question.update_attributes(correct: true)
    else
      game_question.update_attributes(correct: false)
    end
    #add score value from question to total. If question was incorrect, 0 is added
    revised_score = game[:score]+score_update["value"]
    game.update_attributes(score: revised_score)
  end

end
