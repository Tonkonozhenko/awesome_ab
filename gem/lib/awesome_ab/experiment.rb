require 'active_support/concern'

module AwesomeAb
  class Experiment
    mattr_accessor :view_helper
    @@view_helper = ActionView::Base.new(Rails::Application::Configuration.new(Rails.root).paths['app/views'])

    class << self
      attr_accessor :variants
      @variants = []
    end

    def self.perform(args = {})
      # block.call(args)
      weights = variants.map { |v| v[:weight] }
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
      index = ranges.find_index { |elem| elem.include?(item) }

      @@view_helper.render "experiments/#{self.to_s.underscore.split('_').first}/experiment_#{index + 1}", args
    end

    def self.experiment(args = {}, &block)
      self.variants ||= []
      variants << {
          weight: args[:weight].presence || 1,
          block: block
      }
    end
  end
end
