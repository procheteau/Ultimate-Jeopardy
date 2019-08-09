require "devise"

class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    submission = JSON.parse(request.body.read)
    wiki = ParseWiki.new
    category = Category.create!(user: current_user, name: submission["name"], clues_count: 5)
    answer200_formatted = submission["answer200"].downcase.titleize
    answer400_formatted = submission["answer400"].downcase.titleize
    answer600_formatted = submission["answer600"].downcase.titleize
    answer800_formatted = submission["answer800"].downcase.titleize
    answer1000_formatted = submission["answer1000"].downcase.titleize
    Question.create!(category: category, question_text: submission["question_text200"].upcase, answer: submission["answer200"].upcase, value: 200, wiki_intro: wiki.intro(answer200_formatted), wiki_image: wiki.image(answer200_formatted))
    Question.create!(category: category, question_text: submission["question_text400"].upcase, answer: submission["answer400"].upcase, value: 400, wiki_intro: wiki.intro(answer400_formatted), wiki_image: wiki.image(answer400_formatted))
    Question.create!(category: category, question_text: submission["question_text600"].upcase, answer: submission["answer600"].upcase, value: 600, wiki_intro: wiki.intro(answer600_formatted), wiki_image: wiki.image(answer600_formatted))
    Question.create!(category: category, question_text: submission["question_text800"].upcase, answer: submission["answer800"].upcase, value: 800, wiki_intro: wiki.intro(answer800_formatted), wiki_image: wiki.image(answer800_formatted))
    Question.create!(category: category, question_text: submission["question_text1000"].upcase, answer: submission["answer1000"].upcase, value: 1000, wiki_intro: wiki.intro(answer1000_formatted), wiki_image: wiki.image(answer1000_formatted))
    flash[:success] = "Category added successfully!"
    render :new
  end

end
