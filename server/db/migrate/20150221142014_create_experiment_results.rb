class CreateExperimentResults < ActiveRecord::Migration
  def change
    create_table :experiment_results do |t|
      t.string :session_id
      t.integer :experiment_case_id
      t.boolean :finished, null: false, default: false
      t.timestamps null: false
    end
  end
end
