class CreateExperiment < ActiveRecord::Migration
  def change
    create_table :experiments do |t|
      t.integer :user_id
      t.string :name, null: false, default: ""
      t.timestamps
    end
  end
end
