require 'active_support/concern'

module AwesomeAb
  class Experiment
    mattr_accessor :view_helper
    @@view_helper = ActionView::Base.new(Rails::Application::Configuration.new(Rails.root).paths['app/views'])

    # ---

    class << self
      attr_accessor :variants
      @variants = []
    end

    def self.experiment(args = {}, &block)
      self.variants ||= []
      variants << {
          weight: args[:weight].presence || 1,
          block: block
      }
    end

    def self.experiment_name
      self.to_s.gsub('Experiment', '').underscore
    end

    # ---

    def initialize(session_id)
      @session_id = session_id
      @redis_key = "experiments:#{self.class.experiment_name}:#{Time.now.strftime('%Y%m%d')}:#{session_id}"
    end

    def ab_test(args = {})
      index = variant_from_redis || calculate_variant
      @@view_helper.render "experiments/#{self.class.experiment_name}/experiment_#{index + 1}", args
    end

    def calculate_variant
      weights = self.class.variants.map { |v| v[:weight] }
      item = rand(weights.inject(&:+))
      ranges = weights.inject([]) do |ary, num|
        ary <<
            if ary.empty?
              0...num
            else
              last = ary.last.last
              last...last + num
            end
      end
      variant = ranges.find_index { |elem| elem.include?(item) }
      variant_to_redis(variant)
      variant
    end

    def variant_from_redis
      r = AwesomeAb.redis.hget(@redis_key, :variant)
      r && r.to_i
    end

    def variant_to_redis(variant)
      @session_id.present? && AwesomeAb.redis.hset(@redis_key, :variant, variant)
    end

    # Finish experiment
    def ab_finish(args = {})
      finish_to_redis unless finished?
    end

    def finish_from_redis
      AwesomeAb.redis.hget(@redis_key, :finished)
    end

    def finished?
      finish_from_redis == 'true'
    end

    def finish_to_redis
      @session_id.present? && variant_from_redis && AwesomeAb.redis.hset(@redis_key, :finished, 'true')
    end
  end
end
