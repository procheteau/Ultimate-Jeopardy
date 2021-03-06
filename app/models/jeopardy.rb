require 'httparty'
require 'rubygems'

class Jeopardy
  include HTTParty

  def category(category_num)
    self.class.base_uri "http://jservice.io/api/category?&id="
    response_object = self.class.get(category_num.to_s)
    clue_objects = response_object['clues']

    question_object_array = questions(clue_objects)
    #if there are not enough valid questions in this category, return nil
    if question_object_array == nil
      return nil
    end

    category_object = {
      name: response_object['title'].upcase,
      clues_count: response_object['clues_count'],
      questions: question_object_array
    }
  end

  def questions(clue_objects)
    question_object_array = []
    value_check=[]
    clue_objects.each do |clue|
      question ={
        question_text: clean_question(clue['question']),
        answer: clean_answer(clue['answer']),
        value: clue['value']
      }
      #if question is complete (no bad questions, answers, or missing values) include in object array
      if question[:question_text] != nil && question[:answer] != nil && question[:value] != nil
        question_object_array << question
        if !value_check.include?(question[:value])
          value_check << question[:value]
        end
      end
    end

    #return nil if category does not have enough valid questions to fill a board category
    if !([200,400,600,800,1000]-value_check).empty?
      return nil
    end
    return question_object_array
  end

  def clean_question(text)
    text = text.upcase
    #conditions filter out poor questions that reference a video, picture, or guest on show
    if text.include?('USUALLY REFERS')
      return nil
    end
    if text.include?('SEEN HERE') || text.include?('HEARD HERE')
      return nil
    end
    if text.include?('CLUE CREW')
      return nil
    end
    if text.include?('CLUE') || text.include?('I\'M') || text.include?('I\'VE') || text.include?('ALEX')
      return nil
    end
    return text
  end

  def clean_answer(text)
    #if category includes rhyming answers, pass on questions
    if text.include?('/')
      return nil
    end
    #remove any extra spaces,italics tags, extra quotes. Replace any instances of '&' with 'and' to improve wiki queries
    text = text.gsub(/&/, "and")
    text = text.gsub(/<i>/, "")
    text = text.gsub(/ +/, " ")
    text = text.gsub(/\"/, "")

    #Check for second answer in parentheses. If "or" is not included in phrase, then value in parentheses is actually
    #part of the first answer. Extract from parentheses to include with clean answer text
    #For Example: (Ferdinand) Marcos
    if text[/\((.*?)\)/, 1]
      if text[/\((.*?)\)/, 1].include?('or ')
        text = text.gsub(/\(.*\)/, "")
      else
        text = text.gsub(/[()]/, "")
      end
    end

    #remove first 'a','an', 'it's' from phrases, such as "a pulley"
    array = text.split(' ')
    if array[0]=='a'|| array[0]=='an' || array[0]=='it\'s'
      array.shift
    end
    text = array.join(' ')
    text = text.upcase
  end
end
