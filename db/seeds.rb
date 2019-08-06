require_relative '../app/models/jeopardy.rb'
require_relative '../app/models/parsewiki.rb'
require_relative '../app/models/category.rb'
require_relative '../app/models/question.rb'
require 'rubygems'

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
  #   Question.create!(category: category, question_text: question_object[:question_text], answer: question_object[:answer], value: question_object[:value], wiki_intro: intro, wiki_image: image_url)


Array(16000..18410).each_with_index do |num,index|
  puts "Category #{index}"
  if jeopardy.category(num) != nil
    category_object = jeopardy.category(num)
    question_objects = category_object[:questions]
    category = Category.create!(name: category_object[:name] ,clues_count: category_object[:clues_count])
    question_objects.each_with_index do |question_object,index|
      puts "Question #{index}"
      #format answer to capitals first letters of words only for improved Wikipedia queries
      answer_formatted = question_object[:answer].downcase.titleize
      intro = wiki.intro(answer_formatted)
      image_url = wiki.image(answer_formatted)
      Question.create!(category: category, question_text: question_object[:question_text], answer: question_object[:answer], value: question_object[:value], wiki_intro: intro, wiki_image: image_url)
    end
  end
end
