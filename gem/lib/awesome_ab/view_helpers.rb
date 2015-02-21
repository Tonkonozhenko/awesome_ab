module AwesomeAb
  module ViewHelpers
    def ab_test(name, args = {})
      begin
        (name.camelcase + 'AbTest').constantize.perform(args)
      rescue NameError => ex
        raise Exceptions::TestMissing.new ex.message
      end
    end
  end
end