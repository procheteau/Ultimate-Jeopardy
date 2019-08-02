class Api::V1::GamesController < ApplicationController

  def show
    render json: Game.find(params[:id])
  end

end
