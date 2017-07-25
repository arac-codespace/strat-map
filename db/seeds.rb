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


# Lithology table - sedimentary
sedimentary_list = [
{name:"Conglomerate", name2: "Gravel", name3: "", rock_type: "Sedimentary", classification:"Conglomerate", url: "#sed601" }, 
{name:"Conglomerate", name2: "Gravel", name3: "", rock_type: "Sedimentary", classification:"Conglomerate", url: "#sed602" }, 
{name:"Crossbedded conglomerate", name2: "Crossbedded gravel", name3: "", rock_type: "Sedimentary", classification:"Conglomerate", url: "#sed603" },
{name:"Breccia", name2: "", name3: "", rock_type: "Sedimentary", classification:"Breccia", url: "#sed605" },
{name:"Breccia", name2: "", name3: "", rock_type: "Sedimentary", classification:"Breccia", url: "#sed606" },  
{name:"Massive sandstone", name2: "Massive sand", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed607" }, 
{name:"Bedded sandstone", name2: "Bedded sand", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed608" }, 
{name:"Crossbedded sandstone", name2: "Crossbedded sand", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed609" },
{name:"Crossbedded sandstone", name2: "Crossbedded sand", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed610" },
{name:"Ripple-bedded sandstone", name2: "Ripple-bedded sand", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed611" },
{name:"Argillaceous sandstone", name2: "Shaly sandstone", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed612" },
{name:"Calcareous sandstone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed613" },
{name:"Dolomitic sandstone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed614" },
{name:"Siltstone", name2: "Silt", name3: "Shaly silt", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed616" }, 
{name:"Calcareous siltstone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed617" }, 
{name:"Dolomitic siltstone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed618" },
{name:"Sandy or Silty Shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed619" },
{name:"Clay shale", name2: "Clay", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed620" },
{name:"Cherty Shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed621" },
{name:"Dolomitic Shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed622" },
{name:"Calcareous shale", name2: "Marl", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed623" },
{name:"Carbonaceous shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed624" },
{name:"Oil shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed625" },
{name:"Chalk", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed626" },
{name:"Limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed627" }, 
{name:"Clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed628" }, 
{name:"Fossiliferous clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed629" },
{name:"Nodular limestone", name2: "Irregularly bedded limestone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed630" },
{name:"Limestone, irregular fillings of saccharoidal dolomite", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed631" },
{name:"Crossbedded limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed632" },
{name:"Cherty crossbedded limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed633" },
{name:"Cherty and sandy crossbedded clastic limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed634" },
{name:"Oolitic limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed635" },
{name:"Sandy limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed636" },
{name:"Silty limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed637" },
{name:"Argillaceous limestone", name2: "Shaly limestone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed638" },
{name:"Cherty limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed639" },
{name:"Cherty limestone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed640" },
{name:"Dolomitic limestone", name2: "Limy dolostone", name3: "Limy dolomite", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed641" },
{name:"Dolomite", name2: "Dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed642" },
{name:"Crossbedded dolomite", name2: "Crossbedded dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed643" },
{name:"Oolitic dolomite", name2: "Oolitic dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed644" },
{name:"Sandy dolomite", name2: "Sandy dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed645" },
{name:"Silty dolomite", name2: "Silty dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed646" },
{name:"Argillaceous or shaly dolomite", name2: "Argillaceous or shaly dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed647" },
{name:"Cherty dolomite", name2: "Cherty dolostone", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed648" },
{name:"Bedded Chert", name2: "", name3: "", rock_type: "Sedimentary", classification:"Siliceous", url: "#sed649" },
{name:"Bedded chert", name2: "", name3: "", rock_type: "Sedimentary", classification:"Siliceous", url: "#sed650" },
{name:"Fossiliferous bedded chert", name2: "", name3: "", rock_type: "Sedimentary", classification:"Siliceous", url: "#sed651" },
{name:"Fossiliferous rock", name2: "", name3: "", rock_type: "Sedimentary", classification:"Carbonate", url: "#sed652" },
{name:"Diatomaceous rock", name2: "", name3: "", rock_type: "Sedimentary", classification:"Siliceous", url: "#sed653" },
{name:"Subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed654" },
{name:"Crossbedded Subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed655" },
{name:"Ripple-bedded subgraywacke", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed656" },
{name:"Peat", name2: "", name3: "", rock_type: "Sedimentary", classification:"Organic", url: "#sed657" }, 
{name:"Coal", name2: "", name3: "", rock_type: "Sedimentary", classification:"Organic", url: "#sed658" }, 
{name:"Bony coal", name2: "Impure coal", name3: "", rock_type: "Sedimentary", classification:"Organic", url: "#sed659" },
{name:"Underclay", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed660" },
{name:"Flint clay", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed661" },
{name:"Bentonite", name2: "", name3: "", rock_type: "Sedimentary", classification:"Mudrock", url: "#sed662" },
{name:"Glauconite", name2: "", name3: "", rock_type: "Sedimentary", classification:"Ironstone", url: "#sed663" },
{name:"Limonite", name2: "", name3: "", rock_type: "Sedimentary", classification:"Ironstone", url: "#sed664" },
{name:"Siderite", name2: "", name3: "", rock_type: "Sedimentary", classification:"Ironstone", url: "#sed665" },
{name:"Phosphatic-nodular rock", name2: "", name3: "", rock_type: "Sedimentary", classification:"Phosphatic", url: "#sed666" },
{name:"Gypsum", name2: "", name3: "", rock_type: "Sedimentary", classification:"Evaporite", url: "#sed667" },
{name:"Salt", name2: "", name3: "", rock_type: "Sedimentary", classification:"Evaporite", url: "#sed668" },
{name:"Interbedded sandstone and siltstone", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed669" },
{name:"Interbedded sandstone and shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed670" },
{name:"Interbedded ripplebedded sandstone and shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Sandstone", url: "#sed671" },
{name:"Interbedded shale and silty limestone (shale dominant)", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed672" },
{name:"Interbedded shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed673" },
{name:"Interbedded shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed674" },
{name:"Interbedded calcareous shale and limestone (shale dominant)", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed675" },
{name:"Interbedded silty limestone and shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed676" },
{name:"Interbedded limestone and shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed677" },
{name:"Interbedded limestone and shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed678" },
{name:"Interbedded limestone and shale (limestone dominant)", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed679" },
{name:"Interbedded limestone and calcareous shale", name2: "", name3: "", rock_type: "Sedimentary", classification:"Interbedded-mudrock", url: "#sed680" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed681" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed682" },
{name:"Till", name2: "Diamicton", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed683" },
{name:"Loess", name2: "", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed684" },
{name:"Loess", name2: "", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed685" },
{name:"Loess", name2: "", name3: "", rock_type: "Sedimentary", classification:"Other", url: "#sed686" }
]  

sedimentary_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# Lithology table - igm

igm_list = [
{name:"Metamorphism", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm701" },
{name:"Quartzite", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm702" },
{name:"Slate", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm703" },
{name:"Schistose granite", name2: "Gneissoid granite", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm704" },
{name:"Schist", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm705" },
{name:"Contorted schist", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm706" },
{name:"Schist and gneiss", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm707" },
{name:"Gneiss", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm708" },
{name:"Contorted gneiss", name2: "", name3: "", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm709" },
{name:"Soapstone", name2: "Serpentinite", name3: "Talc", rock_type: "Metamorphic", classification:"Metamorphic", url: "#igm710" },
{name:"Tuffaceous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanoclastic", url: "#igm711" },
{name:"Crystal tuff", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanoclastic", url: "#igm712" },
{name:"Devitrified tuff", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanoclastic", url: "#igm713" },
{name:"Volcanic breccia and tuff", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanoclastic", url: "#igm714" },
{name:"Volcanic breccia or agglomerate", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanoclastic", url: "#igm715" },
{name:"Zeolitic rock", name2: "", name3: "", rock_type: "Other", classification:"Other", url: "#igm716" },
{name:"Basaltic flows", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanic", url: "#igm717" },
{name:"Granite", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm718" },
{name:"Granite", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm719" },
{name:"Banded igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm720" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm721" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm722" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm723" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm724" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm725" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm726" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm727" },
{name:"Igneous rock", name2: "", name3: "", rock_type: "Igneous", classification:"Igneous", url: "#igm728" },
{name:"Porphyritic rock", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanic", url: "#igm729" },
{name:"Porphyritic rock", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanic", url: "#igm730" },
{name:"Vitrophyre", name2: "", name3: "", rock_type: "Igneous", classification:"Volcanic", url: "#igm731" },
{name:"Quartz", name2: "", name3: "", rock_type: "Other", classification:"Other", url: "#igm732" },
{name:"Ore", name2: "", name3: "", rock_type: "Other", classification:"Other", url: "#igm733" },
{name:"None or Unknown", name2: "", name3: "", rock_type: "Other", classification:"", url: "#nil000" }

]

igm_list.each do |x|
  Lithology.where(url: x[:url]).first_or_create.update(x)
end

# CONTACTS POPULATION
contact_list = [
{name:"Bedding Plane", contact_type: "Conformity"},  
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
