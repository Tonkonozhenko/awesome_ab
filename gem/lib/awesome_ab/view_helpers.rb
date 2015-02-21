module AwesomeAb
  module ViewHelpers
    def ab_test(name, args = {})
      begin
        (name.camelcase + 'Experiment').constantize.perform(args)
      rescue NameError => ex
        raise Exceptions::ExperimentMissing.new ex.message
      end
    end
  end
end