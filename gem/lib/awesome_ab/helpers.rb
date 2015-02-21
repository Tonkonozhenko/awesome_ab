module AwesomeAb
  module Helpers
    def ab_test(name, args = {})
      begin
        (name.camelcase + 'Experiment').constantize.new(session.id).ab_test(args)
      rescue NameError => ex
        raise Exceptions::ExperimentMissing.new ex.message
      end
    end

    def ab_finish(name, args = {})
      begin
        (name.camelcase + 'Experiment').constantize.new(session.id).ab_finish(args)
      rescue NameError => ex
        raise Exceptions::ExperimentMissing.new ex.message
      end
    end
  end
end