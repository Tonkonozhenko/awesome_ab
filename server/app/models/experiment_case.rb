class ExperimentCase < ActiveRecord::Base
  has_many :experiment_results
  belongs_to :experiment
end
