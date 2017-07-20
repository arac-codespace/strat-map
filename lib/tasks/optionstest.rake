namespace :optionstest do
  desc "TODO"
  task generator: :environment do
    
    
# 1..117
# first round will be 1..30, 30..60, 60..90, 90..117
    # lithology_id_range = (90..117)
    
    (1..30).each do |num|
      new_layers = Layer.new
      new_layers.lithology_id = rand(1..117)
      new_layers.strat_column_id = 2
      new_layers.name = (0...8).map { (65 + rand(26)).chr }.join
      new_layers.formation = "Juana Diaz Formation"
      new_layers.thickness = rand(10..30)
      new_layers.description = (0...8).map { (65 + rand(26)).chr }.join
      new_layers.timescale_id = rand(1..170) #1..170
      new_layers.contact_id = rand(1..10)
      new_layers.epoch_age = (0...8).map { (65 + rand(26)).chr }.join
    
      new_layers.save
    end
    
    
    
    
    
    
    
  end

end
