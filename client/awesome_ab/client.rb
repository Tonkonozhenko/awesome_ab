require 'redis'
require 'active_support/all'

module AwesomeAb
  class Client
    attr_accessor :redis, :interval

    def initialize(credentials = nil, interval = 5)
      @interval = interval

      if credentials.blank?
        credentials = { host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'], db: ENV['REDIS_DB'] }
        credentials[:password] = ENV['REDIS_PASSWORD'] if ENV['REDIS_PASSWORD'].present?
      end

      @redis = Redis.new(host: credentials[:host], port: credentials[:port], db: credentials[:db], driver: 'hiredis')
    end

    def run

    end
  end

  class Experiment
    class << self
      attr_accessor :client
      delegate :redis, to: :client
    end

    delegate :redis, to: :class

    def self.find_all(session_id = nil, match = "experiments:*:*:#{session_id}", with_session = false)
      index = 0
      results = []
      begin
        res = redis.scan index, match: match
        res[1].each do |key|
          key_split = key.split(':')
          obj = redis.hgetall(key).merge(name: key_split[1])
          obj.merge!(session_id: key_split[3]) if with_session
          results << obj
        end
        index = res[0]
      end while index != '0'
      results
    end


    def initialize(name, session_id, variant, finished = false)
      redis_key(name, session_id)
      if finished && redis_variant
        redis.hset @redis_key, :finished, true
      elsif !@variant
        redis.hset @redis_key, :variant, variant
      end
    end

    def redis_variant
      @variant ||= redis.hget(@redis_key, :variant)
    end

    def redis_key(name, session_id)
      @redis_key ||= "experiments:#{name}:#{Time.now.strftime('%Y%m%d')}:#{session_id}"
    end
  end
end