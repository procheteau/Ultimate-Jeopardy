# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require_relative '../app/models/jeopardy.rb'
require_relative '../app/models/parsewiki.rb'
require_relative '../app/models/category.rb'
require_relative '../app/models/question.rb'
require 'rubygems'
require 'pry'

#create categories & questions starting at category#6000 via jservice
jeopardy = Jeopardy.new
wiki = ParseWiki.new
  # num = 6002
  # category_object = jeopardy.category(num)
  # question_objects = category_object[:questions]
  # category = Category.create!(name: category_object[:name] ,clues_count: category_object[:clues_count])
  #   question_object = question_objects[3]
  #   #format answer to capitals first letters of words only for improved Wikipedia queries
  #   answer_formatted = question_object[:answer].downcase.titleize
  #   intro = wiki.intro(answer_formatted)
  #   image_url = wiki.image(answer_formatted)
  #   binding.pry
  #   Question.create!(category: category, question_text: question_object[:question_text], answer: question_object[:answer], value: question_object[:value], wiki_intro: intro, wiki_image: image_url)


Array(6000..18410).each do |num|
  if jeopardy.category(num) != nil
    category_object = jeopardy.category(num)
    question_objects = category_object[:questions]
    category = Category.create!(name: category_object[:name] ,clues_count: category_object[:clues_count])
    question_objects.each do |question_object|
      #format answer to capitals first letters of words only for improved Wikipedia queries
      answer_formatted = question_object[:answer].downcase.titleize
      intro = wiki.intro(answer_formatted)
      image_url = wiki.image(answer_formatted)
      Question.create!(category: category, question_text: question_object[:question_text], answer: question_object[:answer], value: question_object[:value], wiki_intro: intro, wiki_image: image_url)
    end
  end
end
