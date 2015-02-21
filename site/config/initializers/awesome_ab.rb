hash = { host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'], db: ENV['REDIS_DB'] }
hash[:password] = ENV['REDIS_PASSWORD'] if ENV['REDIS_PASSWORD'].present?

AwesomeAb.configure do |config|
  config.redis = Redis.new(host: hash[:host], port: hash[:port], db: hash[:db], driver: 'hiredis')
end