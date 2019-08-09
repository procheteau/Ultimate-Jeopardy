require_relative "../models/game_category.rb"
require_relative "../models/game_question.rb"

class GamesController < ApplicationController
  def index
  end

  def show
  end

  def create
    @new_game = Game.create!()
    #populate Quick Game with (6) random, unique categories to fill game board
    array = (1...250).to_a.shuffle!
    array[0...6].each do |random_num|
      @new_game_category = GameCategory.create!(game: @new_game, category: Category.find(random_num))
      #for this category, grab a random question at every question value
      [200,400,600,800,1000].each do |value|
        GameQuestion.create!(game_category: @new_game_category, question: @new_game_category.category.questions.where(value: value).sample)
      end
    end
    redirect_to @new_game
  end

  def update
  end
end

# 6.times do
#   @new_game_category = GameCategory.create!(game: @new_game, category: Category.find(rand(250)+1))
#   #for this category, grab a random question at every question value
#   [200,400,600,800,1000].each do |value|
#     GameQuestion.create!(game_category: @new_game_category, question: @new_game_category.category.questions.where(value: value).sample)
#   end
# end
