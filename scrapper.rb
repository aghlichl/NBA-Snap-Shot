require 'open-uri'
require 'nokogiri'
require 'json'

class BasketballScraper
  PLAYERS = {
    durant: "d/duranke01",
    # lebron: "j/jamesle01",
    # kyrie: "i/irvinky01",
    # kawhi: "l/leonaka01",
    # harden: "h/hardeja01",
    # davis: "d/davisan02"
  }

  def self.scrape!
    player_data = {}
    PLAYERS.each do |k, v|
      url = "https://www.basketball-reference.com/players/#{v}.html"
      html = open(url)
      doc = Nokogiri::HTML(html)
      stats = {}
      doc.at('#div_per_game').at('tbody').search('tr').each do |row|
        cells = row.search('th, td').map do |c|
          # stats["#{c['data-stat']}"] ||= []
          # stats["#{c['data-stat']}"] << c.text
          # stats["#{c['data-stat']}"] = stats["#{c['data-stat']}"].last
        end
      end
      player_data[k] = stats
    end
    json = JSON.pretty_generate(player_data)
    File.open("player_data.json", 'w') { |file| file.write(json) }
  end
end