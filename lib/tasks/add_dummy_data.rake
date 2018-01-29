namespace :add_dummy_data do
  desc "Adds stratigraphic column data for testing purposes"
  task generate_columns: :environment do

  	lat_array = [17.994301, 17.971415, 17.983825, 17.965537, 17.950514, 17.988955]
  	lng_array = [-66.626127,-66.565574,-66.523345, -66.182082, -66.129554,-66.012351]

  	if Rails.env.development?

	  	(1..2).each do |x|
		  	column = StratColumn.new
		  	column.user_id = 1
		  	column.name = "Paginate dummy data number " + x.to_s
		  	column.lat = lat_array[x-1]
		  	column.lng = lng_array[x-1]
		  	column.description = "Dummy data description"
		  	column.location = "Ponce"
		  	column.depth = false
		  	column.save

		  	(1..4).each do |x|
		  		last_column = StratColumn.last
		  		layer = Layer.new

		  		layer.lithology_id = rand(118)
		  		layer.strat_column_id = last_column.id
		  		layer.name = "Dummy layer number " + x.to_s
		  		layer.formation = "Dummy layer formation"
		  		layer.thickness = rand(25)
		  		layer.description = "Dummy layer description"
		  		layer.timescale_id = rand(168)
		  		layer.contact_id = rand(10)
		  		layer.save
		  	end
	  	end
  	else
  		puts "This script is intended to run in development only!"
  	end

  end

end
