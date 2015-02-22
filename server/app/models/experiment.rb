class Experiment < ActiveRecord::Base
  belongs_to :user
  has_many :experiment_cases, dependent: :destroy
end
