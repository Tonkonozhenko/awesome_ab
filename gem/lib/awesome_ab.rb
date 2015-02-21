require 'redis'
require 'hiredis'

require_relative 'awesome_ab/version'
require_relative 'awesome_ab/exceptions'
require_relative 'awesome_ab/experiment'
require_relative 'awesome_ab/configuration'
require_relative 'awesome_ab/railtie' if defined?(Rails)

module AwesomeAb
  extend self
  attr_accessor :configuration

  delegate :redis, to: :configuration

  def configure
    self.configuration ||= Configuration.new
    yield(configuration)
  end
end

AwesomeAb.configure {}
