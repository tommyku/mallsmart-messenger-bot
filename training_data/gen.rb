require 'csv'
require 'pp'

restaurant_tags = %w[
  hong\ kong
  chinese
  cantonese
  asian
  western
  cafe
  sweet
]

fashion_tags = %w[
  male\ fashion
  female\ fashion
  children
  formal
  casual
  outdoor
  underwear
  skirt
  jeans
  pants
  sport\ shoes
  leather
  baby
]

entertainment_tags = %w[
  books
  wine
  movie
  electronics
  gifts
  health
  florist
  beauty
  makeup
  jewellery
  fitness
  accessories
  banking
  travel
]

all_tags = [restaurant_tags, fashion_tags, entertainment_tags]

user_ids = (1..100)

user_preferences = (1..100).map{ (1..3).map{(rand() * 3 + 1)} }

def impression(preferences, tag_group_id)
  rand * preferences[tag_group_id]
end

user_restaurant_tags = []
user_fashion_tags = []
user_entertainment_tags = []

CSV.open('./restaurant.csv', 'wb') do |csv|
  csv << %w[user_id tag rating]
  user_ids.each do |user_id|
    restaurant_tags.each do |tag|
      row = [user_id, tag, impression(user_preferences[user_id - 1], 0)]
      csv << row
      user_restaurant_tags << row
    end
  end
end

CSV.open('./fashion.csv', 'wb') do |csv|
  csv << %w[user_id tag rating]
  user_ids.each do |user_id|
    fashion_tags.each do |tag|
      row = [user_id, tag, impression(user_preferences[user_id - 1], 1)]
      csv << row
      user_fashion_tags << row
    end
  end
end

CSV.open('./entertainment.csv', 'wb') do |csv|
  csv << %w[user_id tag rating]
  user_ids.each do |user_id|
    entertainment_tags.each do |tag|
      row = [user_id, tag, impression(user_preferences[user_id - 1], 2)]
      csv << row
      user_entertainment_tags << row
    end
  end
end

CSV.open('./training.csv', 'wb') do |csv|
  csv << %w[user_id tag rating]
  (user_restaurant_tags + user_fashion_tags + user_entertainment_tags).each do |row|
    csv << row
  end
end
