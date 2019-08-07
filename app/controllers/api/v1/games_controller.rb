class Api::V1::GamesController < ApplicationController
skip_before_action :verify_authenticity_token

  def show
    render json: Game.find(params[:id])
  end

  def update
    gameId = params[:id]
    game = Game.find(gameId)
    score_update = JSON.parse(request.body.read)
    revised_score = game[:score]+score_update["value"]
    game.update_attributes(score: revised_score)
  end

end
