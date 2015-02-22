class ExperimentCase < ActiveRecord::Base
  has_many :experiment_results, dependent: :destroy
  belongs_to :experiment
end
