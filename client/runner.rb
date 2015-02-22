require 'dotenv'
Dotenv.load
require 'rest-client'

require_relative 'awesome_ab/client'
AwesomeAb::Experiment.client = AwesomeAb::Client.new

url = 'http://localhost:3001/upload_data'
secret_key = 'secret_key'
secret_id = 'secret_id'

while true
  puts 'Uploading data...'
  experiments = AwesomeAb::Experiment.find_all(nil, "experiments:*:#{Time.now.strftime('%Y%m%d')}:*", true)
  RestClient.post(url, secret_id: secret_id, secret_key: secret_key, data: experiments.to_json)
  puts 'Data uploaded.'
  sleep 5
end
