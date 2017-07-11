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
{name:"Crossbedded sandstone", name2: "Crossbedded sand", name3: "", rock_type: "Sedimentary", url: "#sed610" },
{name:"Ripple-bedded sandstone", name2: "Ripple-bedded sand", name3: "", rock_type: "Sedimentary", url: "#sed611" },
{name:"Argillaceous sandstone", name2: "Shaly sandstone", name3: "", rock_type: "Sedimentary", url: "#sed612" },
{name:"Calcareous sandstone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed613" },
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
{name:"Crossbedded limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed632" },
{name:"Oolitic limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed635" },
{name:"Sandy limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed636" },
{name:"Silty limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed637" },
{name:"Argillaceous limestone", name2: "Shaly limestone", name3: "", rock_type: "Sedimentary", url: "#sed638" },
{name:"Cherty limestone", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed640" },
{name:"Bedded chert", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed650" },
{name:"Fossiliferous bedded chert", name2: "", name3: "", rock_type: "Sedimentary", url: "#sed651" }
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


# Lithology table - other
other_list = [
{name:"Peat", name2: "", name3: "", rock_type: "Other", url: "#sed657" }, 
{name:"Coal", name2: "", name3: "", rock_type: "Other", url: "#sed658" }, 
{name:"Bony coal", name2: "Impure coal", name3: "", rock_type: "Other", url: "#sed659" },
{name:"Gypsum", name2: "", name3: "", rock_type: "Other", url: "#sed667" },
{name:"Salt", name2: "", name3: "", rock_type: "Other", url: "#sed668" }
]

other_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# 37 entries so far...