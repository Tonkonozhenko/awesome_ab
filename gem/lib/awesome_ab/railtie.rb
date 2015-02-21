require_relative 'view_helpers'

module AwesomeAb
  class Railtie < Rails::Railtie
    initializer 'awesome_ab.test_autoload', before: :set_autoload_paths do |app|
      app.config.autoload_paths << Rails.root.join('app/ab_tests')
    end

    initializer 'awesome_ab.view_helpers' do
      ActionView::Base.send :include, AwesomeAb::ViewHelpers
    end
  end
end