class GamesController < ApplicationController
  def index
  end

  def show
  end

  def create
    @new_game = Game.create!()
    #populate Quick Game with (6) random categories to fill game board
    6.times do
      new_game_category = GameCategory.create!(game: @new_game, category: Category.find(rand(3308)))
      #for this category, grab a random question at every question value
      [200,400,600,800,1000].each do |value|
        GameQuestion.create!(game: @new_game, question: new_game_category.questions.where(value: value).sample)
      end
    end
    redirect_to @new_game
  end

  def update
  end
end
