require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :game do
    score { 200 }
    completed { false }
    id { 1 }
  end

  factory :category do
    name {'Amazing Category Name'}
    clues_count {5}
    id { 1 }
  end

  factory :question do
    question_text { 'This is a Jeopardy Question' }
    answer { 'Answer to Question' }
    value{ 200 }
    wiki_intro {'Some information from Wikipedia'}
    wiki_image {'wikipedia.org/wiki/coding/coding.jpg'}
    category_id { 1 }
    id { 1 }
  end

end
