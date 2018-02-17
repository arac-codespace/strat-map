namespace :add_dummy_data do
  desc "Adds stratigraphic column data for testing purposes"
  task generate_columns: :environment do

  	# rake add_dummy_data:generate_columns
  	lat_array = [17.994301, 17.971415, 17.983825, 17.965537, 17.950514, 17.988955]
  	lng_array = [-66.626127,-66.565574,-66.523345, -66.182082, -66.129554,-66.012351]
  	fauna_array = ["Kuphus", "Canis", "Carcharhiniformes", "Felis"]

  	(1..4).each do |x|
	  	column = StratColumn.new
	  	column.user_id = 2
	  	column.name = "Collection dummy data number " + x.to_s
	  	column.lat = lat_array[x-1]
	  	column.lng = lng_array[x-1]
	  	column.description = "Dummy data description"
	  	column.location = "Ponce"
	  	column.depth = false
	  	column.save
	  	random_num = rand(5)

	  	(1..random_num).each do |x|
	  		last_column = StratColumn.last
	  		layer = Layer.new

	  		layer.lithology_id = rand(118)
	  		layer.strat_column_id = last_column.id
	  		layer.name = "Dummy layer number " + x.to_s
	  		layer.formation = "Dummy layer formation"
	  		layer.thickness = rand(0.1..5.0)
	  		layer.description = "Dummy layer description"
	  		layer.timescale_id = rand(168)
	  		layer.contact_id = rand(10)
	  		layer.save
	  		random_num = rand(10)

	  		(1..random_num).each do |x|
	  			last_layer = Layer.last
	  			fossil = Fossil.new

	  			fossil.layer_id = last_layer.id
	  			fossil.name = fauna_array[rand(3)]
	  			fossil.abundance = "Common"
	  			fossil.save
	  		end


	  	end
  	end

  end

end
