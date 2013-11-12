class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
    	t.string :name, :null => false
    	t.integer :note_id, :null => false

      t.timestamps
    end
    add_index :tags, :name
    add_index :tags, [:name, :note_id], :unique => true
  end
end
