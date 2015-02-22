class CreateExperimentCases < ActiveRecord::Migration
  def change
    create_table :experiment_cases do |t|
      t.integer :experiment_id
      t.integer :number
      t.timestamps null: false
    end
  end
end
