require 'csv'

genders = %w[male female female female]

user_ids = (1..100)

CSV.open('./demographics.csv', 'wb') do |csv|
  csv << %w[user_id gender]
  user_ids.each do |user_id|
    csv << [
      user_id,
      genders.sample
    ]
  end
end
