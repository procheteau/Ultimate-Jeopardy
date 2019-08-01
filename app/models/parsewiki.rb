require 'httparty'

class ParseWiki
  include HTTParty

  def intro(subject)
    self.class.base_uri "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="

    query_string = subject.gsub(' ','%20')
    begin
      wiki_object = self.class.get(query_string)
    rescue
      return "Sorry, No Additional Information Available"
    end
    if wiki_object['query']['pages'].keys == [] || wiki_object['query']['pages'].keys == nil
      return "Sorry, No Additional Information Available"
    end
    page_key = wiki_object['query']['pages'].keys[0]
    wiki_intro = wiki_object['query']['pages'][page_key]["extract"]
    #if wiki_intro is empty or too general, then the wiki query failed.
    if wiki_intro == "" || wiki_intro == nil
      return "Sorry, No Additional Information Available"
    end
    if wiki_intro.include?('may refer to') || wiki_intro.include?('most commonly refers to')
      return "Sorry, No Additional Information Available"
    end
    clean_text(wiki_intro)
  end

  def image(subject,picture_size = 400)
    self.class.base_uri "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&redirects=1&format=json&"
    query_string = subject.gsub(' ','%20')
    image_query = "titles=#{query_string}&pithumbsize=#{picture_size}"
    begin
      wiki_object = self.class.get(image_query)
    rescue
      return "https://www.pngkit.com/png/full/353-3536328_generic-placeholder-image-question-and-answer-signs.png"
    end
    page_key = wiki_object['query']['pages'].keys[0]
    if wiki_object['query']['pages'][page_key]["thumbnail"] == nil
      return "https://www.pngkit.com/png/full/353-3536328_generic-placeholder-image-question-and-answer-signs.png"
    end
    wiki_image = wiki_object['query']['pages'][page_key]["thumbnail"]["source"]
    if wiki_image == nil || wiki_image == ""
      return "https://www.pngkit.com/png/full/353-3536328_generic-placeholder-image-question-and-answer-signs.png"
    end
    return wiki_image
  end

  def clean_text(wiki_intro)
    #check to see if response has newline, indicating a paragraph. If so, extract only the first paragraph
    if (wiki_intro.include?("\n"))
      #return all indexes in which newline occurs
      new_line_indexes = wiki_intro.enum_for(:scan, /(?=\n)/).map { Regexp.last_match.offset(0).first }
      #if intro length to first new line is too short (less than 200 characters) move to the next new line
      if wiki_intro[0..new_line_indexes[0]].length < 200 && new_line_indexes.length > 1
        wiki_intro = wiki_intro[0..new_line_indexes[1]]
      else
        wiki_intro = wiki_intro[0..new_line_indexes[0]]
      end
      #split wiki intro paragraph into array of sentences to check for(and remove) parentheses and extra spaces
      intro_sentences = wiki_intro.gsub(/\n|\r/, ' ').split(/\.\s*/)
      edited_sentences = intro_sentences.map do|sentence|
        sentence = sentence.gsub(/\(.*\)/, " ")
        sentence = sentence.gsub(/ +/, " ")
      end
      wiki_intro = edited_sentences.join(". ")
      #sub removes trailing space only after the initial state name
      wiki_intro = wiki_intro.sub(/ +,/, ",")
    else
      #if response had no newlines, pass the whole extract
      intro_sentences = wiki_intro.gsub(/\n|\r/, ' ').split(/\.\s*/)
      edited_sentences = intro_sentences.map do|sentence|
        sentence = sentence.gsub(/\(.*\)/, " ")
        sentence = sentence.gsub(/ +/, " ")
      end
      wiki_intro = edited_sentences.join(". ")
      #sub removes trailing space only after the initial state name
      wiki_intro = wiki_intro.sub(/ +,/, ",")
    end
  end
end
