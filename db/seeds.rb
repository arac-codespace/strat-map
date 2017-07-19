# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Seeding the lithology table...
# First create an array holding the entries and then pass the array to
# an each loop...

# Lithology table - gravel
gravel_list = [
{name:"Conglomerate", name2: "Conglomerate - Low matrix %", name3: "Gravel", rock_type: "Sedimentary", url: "#sed601" }, 
{name:"Conglomerate", name2: "Conglomerate - High matrix %", name3: "Gravel", rock_type: "Sedimentary", url: "#sed602" }, 
{name:"Crossbedded conglomerate", name2: "Crossbedded gravel", name3: "", rock_type: "Sedimentary", url: "#sed603" },
{name:"Breccia", name2: "Breccia - High matrix %", name3: "", rock_type: "Sedimentary", url: "#sed605" },
{name:"Breccia", name2: "Breccia - Low matrix %", name3: "", rock_type: "Sedimentary", url: "#sed606" }
]  

gravel_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# Lithology table - sandstone
sandstone_list = [
{name:"Massive sandstone", name2: "Massive sand", name3: "", rock_type: "Sedimentary", url: "#sed607" }, 
{name:"Bedded sandstone", name2: "Bedded sand", name3: "", rock_type: "Sedimentary", url: "#sed608" }, 
{name:"Crossbedded sandstone", name2: "Crossbedded sand", name3: "", rock_type: "Sedimentary", url: "#sed609" },
{name:"Crossbedded sandstone", name2: "Crossbedded sand", name3: "", rock_type: "Sedimentary", url: "#sed610" },
{name:"Ripple-bedded sandstone", name2: "Ripple-bedded sand", name3: "", rock_type: "Sedimentary", url: "#sed611" },
{name:"Argillaceous sandstone", name2: "Shaly sandstone", name3: "", rock_type: "Sedimentary", url: "#sed612" },
{name:"Calcareous sandstone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed613" },
{name:"Dolomitic sandstone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed614" },
{name:"Dolomitic siltstone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed618" },
{name:"Sandy or Silty Shale", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed619" },
{name:"Cherty Shale", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed621" },
{name:"Dolomitic Shale", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed622" },
{name:"Subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed654" },
{name:"Crossbedded Subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed655" },
{name:"Ripple-bedded subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed656" }
]  

sandstone_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# Lithology table - limestone

limestone_list = [
{name:"Limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed627" }, 
{name:"Clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed628" }, 
{name:"Fossiliferous clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed629" },
{name:"Nodular limestone", name2: "Irregularly bedded limestone", name3: "", rock_type: "Sedimentary", url: "#sed630" },
{name:"Limestone, irregular fillings of saccharoidal dolomite", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed631" },
{name:"Crossbedded limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed632" },
{name:"Cherty crossbedded limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed633" },
{name:"Cherty and sandy crossbedded clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed634" },
{name:"Oolitic limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed635" },
{name:"Sandy limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed636" },
{name:"Silty limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed637" },
{name:"Argillaceous limestone", name2: "Shaly limestone", name3: "", rock_type: "Sedimentary", url: "#sed638" },
{name:"Cherty limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed639" },
{name:"Cherty limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed640" },
{name:"Dolomitic limestone", name2: "Limy dolostone", name3: "Limy dolomite", rock_type: "Sedimentary", url: "#sed641" },
{name:"Dolomite", name2: "Dolostone", name3: "", rock_type: "Sedimentary", url: "#sed642" },
{name:"Crossbedded dolomite", name2: "Crossbedded dolostone", name3: "", rock_type: "Sedimentary", url: "#sed643" },
{name:"Oolitic dolomite", name2: "Oolitic dolostone", name3: "", rock_type: "Sedimentary", url: "#sed644" },
{name:"Sandy dolomite", name2: "Sandy dolostone", name3: "", rock_type: "Sedimentary", url: "#sed645" },
{name:"Silty dolomite", name2: "Silty dolostone", name3: "", rock_type: "Sedimentary", url: "#sed646" },
{name:"Argillaceous or shaly dolomite", name2: "Argillaceous or shaly dolostone", name3: "", rock_type: "Sedimentary", url: "#sed647" },
{name:"Cherty dolomite", name2: "Cherty dolostone", name3: "", rock_type: "Sedimentary", url: "#sed648" },
{name:"Bedded Chert", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed649" },
{name:"Bedded chert", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed650" },
{name:"Fossiliferous bedded chert", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed651" },
{name:"Fossiliferous rock", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed652" },
{name:"Diatomaceous rock", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed653" }
] 

limestone_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end


# Lithology table - silt/shale

silt_list = [
{name:"Siltstone", name2: "Silt", name3: "Shaly silt", rock_type: "Sedimentary", url: "#sed616" }, 
{name:"Calcareous siltstone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed617" }, 
{name:"Clay shale", name2: "Clay", name3: "", rock_type: "Sedimentary", url: "#sed620" },
{name:"Calcareous shale", name2: "Marl", name3: "", rock_type: "Sedimentary", url: "#sed623" },
{name:"Carbonaceous shale", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed624" },
{name:"Oil shale", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed625" },
{name:"Salt", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed626" }
]

silt_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# Lithology table - igm

igm_list = [
{name:"Metamorphism", name2: "", name3: "", rock_type: "Metamorphic", url: "#igm701" }
]

igm_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end


# Lithology table - other
other_list = [
{name:"Peat", name2: "", name3: "", rock_type: "Other", url: "#sed657" }, 
{name:"Coal", name2: "", name3: "", rock_type: "Other", url: "#sed658" }, 
{name:"Bony coal", name2: "Impure coal", name3: "", rock_type: "Other", url: "#sed659" },
{name:"Underclay", name2: "", name3: "", rock_type: "Other", url: "#sed660" },
{name:"Flint clay", name2: "", name3: "", rock_type: "Other", url: "#sed661" },
{name:"Bentonite", name2: "", name3: "", rock_type: "Other", url: "#sed662" },
{name:"Glauconite", name2: "", name3: "", rock_type: "Other", url: "#sed663" },
{name:"Limonite", name2: "", name3: "", rock_type: "Other", url: "#sed664" },
{name:"Siderite", name2: "", name3: "", rock_type: "Other", url: "#sed665" },
{name:"Phosphatic-nodular rock", name2: "", name3: "", rock_type: "Other", url: "#sed666" },
{name:"Gypsum", name2: "", name3: "", rock_type: "Other", url: "#sed667" },
{name:"Salt", name2: "", name3: "", rock_type: "Other", url: "#sed668" },
{name:"Interbedded sandstone and siltstone", name2: "", name3: "", rock_type: "Other", url: "#sed669" },
{name:"Interbedded sandstone and shale", name2: "", name3: "", rock_type: "Other", url: "#sed670" },
{name:"Interbedded ripplebedded sandstone and shale", name2: "", name3: "", rock_type: "Other", url: "#sed671" },
{name:"Interbedded shale and silty limestone (shale dominant)", name2: "", name3: "", rock_type: "Other", url: "#sed672" },
{name:"Interbedded shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Other", url: "#sed673" },
{name:"Interbedded shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Other", url: "#sed674" },
{name:"Interbedded calcareous shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Other", url: "#sed675" },
{name:"Interbedded silty limestone and shale", name2: "", name3: "", rock_type: "Other", url: "#sed676" },
{name:"Interbedded limestone and shale", name2: "", name3: "", rock_type: "Other", url: "#sed677" },
{name:"Interbedded limestone and shale", name2: "", name3: "", rock_type: "Other", url: "#sed678" },
{name:"Interbedded limestone and shale (limestone dominant)", name2: "", name3: "", rock_type: "Other", url: "#sed679" },
{name:"Interbedded limestone and calcareous shale", name2: "", name3: "", rock_type: "Other", url: "#sed680" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Other", url: "#sed681" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Other", url: "#sed682" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Other", url: "#sed683" },
{name:"Loess", name2: "", name3: "", rock_type: "Other", url: "#sed684" },
{name:"Loess", name2: "", name3: "", rock_type: "Other", url: "#sed685" },
{name:"Loess", name2: "", name3: "", rock_type: "Other", url: "#sed686" }
]

other_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end






# CONTACTS POPULATION
contact_list = [
{name:"Bedding Plane", contact_type: "Depositional"},  
{name:"Diastem", contact_type: "Depositional"},  
{name:"Angular Unconformity", contact_type: "Depositional"},  
{name:"Disconformity", contact_type: "Depositional"},  
{name:"Paraconformity", contact_type: "Depositional"},  
{name:"Nonconformity", contact_type: "Depositional"},  
{name:"Pedologic Contact", contact_type: "Depositional"},  
{name:"Fault", contact_type: "Tectonic"},  
{name:"Intrusive Contact", contact_type: "Intrusion"},  
{name:"Extrusive Contact", contact_type: "Intrusion"},  
]

contact_list.each do |x|
  Contact.where(name: x[:name]).first_or_create.update(x)
end
