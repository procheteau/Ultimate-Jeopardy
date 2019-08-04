class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :completed, :user_id

  has_many :gamecategories
  # has_many :categories, through: :gamecategories
  #
  # has_many :gamequestions, through: :game_categories
  # has_many :questions, through: :gamequestions
end
