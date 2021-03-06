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


# Credits to PBDB
# https://paleobiodb.org/data1.2/intervals/list.json?scale=1

timescale_list = [
{level:4,interval_name:"Holocene",color:"#FEF2E0",late_age:0.01170,early_age:0.00000},
{level:5,interval_name:"Late Pleistocene",color:"#FFF2D3",late_age:0.12600,early_age:0.01170},
{level:5,interval_name:"Middle Pleistocene",color:"#FFF2C7",late_age:0.78100,early_age:0.12600},
{level:5,interval_name:"Calabrian",color:"#FFF2BA",late_age:1.80600,early_age:0.78100},
{level:3,interval_name:"Quaternary",color:"#F9F97F",late_age:2.58800,early_age:0.00000},
{level:4,interval_name:"Pleistocene",color:"#FFF2AE",late_age:2.58800,early_age:0.01170},
{level:5,interval_name:"Gelasian",color:"#FFEDB3",late_age:2.58800,early_age:1.80600},
{level:5,interval_name:"Piacenzian",color:"#FFFFBF",late_age:3.60000,early_age:2.58800},
{level:4,interval_name:"Pliocene",color:"#FFFF99",late_age:5.33300,early_age:2.58800},
{level:5,interval_name:"Zanclean",color:"#FFFFB3",late_age:5.33300,early_age:3.60000},
{level:5,interval_name:"Messinian",color:"#FFFF73",late_age:7.24600,early_age:5.33300},
{level:5,interval_name:"Tortonian",color:"#FFFF66",late_age:11.62000,early_age:7.24600},
{level:5,interval_name:"Serravallian",color:"#FFFF59",late_age:13.82000,early_age:11.62000},
{level:5,interval_name:"Langhian",color:"#FFFF4D",late_age:15.97000,early_age:13.82000},
{level:5,interval_name:"Burdigalian",color:"#FFFF41",late_age:20.44000,early_age:15.97000},
{level:3,interval_name:"Neogene",abbrev:"Ng",color:"#FFE619",late_age:23.03000,early_age:2.58800},
{level:4,interval_name:"Miocene",color:"#FFFF00",late_age:23.03000,early_age:5.33300},
{level:5,interval_name:"Aquitanian",color:"#FFFF33",late_age:23.03000,early_age:20.44000},
{level:5,interval_name:"Chattian",color:"#FEE6AA",late_age:28.10000,early_age:23.03000},
{level:4,interval_name:"Oligocene",color:"#FDC07A",late_age:33.90000,early_age:23.03000},
{level:5,interval_name:"Rupelian",color:"#FED99A",late_age:33.90000,early_age:28.10000},
{level:5,interval_name:"Priabonian",color:"#FDCDA1",late_age:38.00000,early_age:33.90000},
{level:5,interval_name:"Bartonian",color:"#FDC091",late_age:41.30000,early_age:38.00000},
{level:5,interval_name:"Lutetian",color:"#FCB482",late_age:47.80000,early_age:41.30000},
{level:4,interval_name:"Eocene",color:"#FDB46C",late_age:56.00000,early_age:33.90000},
{level:5,interval_name:"Ypresian",color:"#FCA773",late_age:56.00000,early_age:47.80000},
{level:5,interval_name:"Thanetian",color:"#FDBF6F",late_age:59.20000,early_age:56.00000},
{level:5,interval_name:"Selandian",color:"#FEBF65",late_age:61.60000,early_age:59.20000},
{level:2,interval_name:"Cenozoic",abbrev:"Cz",color:"#F2F91D",late_age:66.00000,early_age:0.00000},
{level:3,interval_name:"Paleogene",abbrev:"Pg",color:"#FD9A52",late_age:66.00000,early_age:23.03000},
{level:4,interval_name:"Paleocene",color:"#FDA75F",late_age:66.00000,early_age:56.00000},
{level:5,interval_name:"Danian",color:"#FDB462",late_age:66.00000,early_age:61.60000},
{level:5,interval_name:"Maastrichtian",color:"#F2FA8C",late_age:72.10000,early_age:66.00000},
{level:5,interval_name:"Campanian",color:"#E6F47F",late_age:83.60000,early_age:72.10000},
{level:5,interval_name:"Santonian",color:"#D9EF74",late_age:86.30000,early_age:83.60000},
{level:5,interval_name:"Coniacian",color:"#CCE968",late_age:89.80000,early_age:86.30000},
{level:5,interval_name:"Turonian",color:"#BFE35D",late_age:93.90000,early_age:89.80000},
{level:4,interval_name:"Late Cretaceous",color:"#A6D84A",late_age:100.50000,early_age:66.00000},
{level:5,interval_name:"Cenomanian",color:"#B3DE53",late_age:100.50000,early_age:93.90000},
{level:5,interval_name:"Albian",color:"#CCEA97",late_age:113.00000,early_age:100.50000},
{level:5,interval_name:"Aptian",color:"#BFE48A",late_age:125.00000,early_age:113.00000},
{level:5,interval_name:"Barremian",color:"#B3DF7F",late_age:129.40000,early_age:125.00000},
{level:5,interval_name:"Hauterivian",color:"#A6D975",late_age:132.90000,early_age:129.40000},
{level:5,interval_name:"Valanginian",color:"#99D36A",late_age:139.80000,early_age:132.90000},
{level:3,interval_name:"Cretaceous",abbrev:"K",color:"#7FC64E",late_age:145.00000,early_age:66.00000},
{level:4,interval_name:"Early Cretaceous",color:"#8CCD57",late_age:145.00000,early_age:100.50000},
{level:5,interval_name:"Berriasian",color:"#8CCD60",late_age:145.00000,early_age:139.80000},
{level:5,interval_name:"Tithonian",color:"#D9F1F7",late_age:152.10000,early_age:145.00000},
{level:5,interval_name:"Kimmeridgian",color:"#CCECF4",late_age:157.30000,early_age:152.10000},
{level:4,interval_name:"Late Jurassic",color:"#B3E3EE",late_age:163.50000,early_age:145.00000},
{level:5,interval_name:"Oxfordian",color:"#BFE7F1",late_age:163.50000,early_age:157.30000},
{level:5,interval_name:"Callovian",color:"#BFE7E5",late_age:166.10000,early_age:163.50000},
{level:5,interval_name:"Bathonian",color:"#B3E2E3",late_age:168.30000,early_age:166.10000},
{level:5,interval_name:"Bajocian",color:"#A6DDE0",late_age:170.30000,early_age:168.30000},
{level:4,interval_name:"Middle Jurassic",color:"#80CFD8",late_age:174.10000,early_age:163.50000},
{level:5,interval_name:"Aalenian",color:"#9AD9DD",late_age:174.10000,early_age:170.30000},
{level:5,interval_name:"Toarcian",color:"#99CEE3",late_age:182.70000,early_age:174.10000},
{level:5,interval_name:"Pliensbachian",color:"#80C5DD",late_age:190.80000,early_age:182.70000},
{level:5,interval_name:"Sinemurian",color:"#67BCD8",late_age:199.30000,early_age:190.80000},
{level:3,interval_name:"Jurassic",abbrev:"J",color:"#34B2C9",late_age:201.30000,early_age:145.00000},
{level:4,interval_name:"Early Jurassic",color:"#42AED0",late_age:201.30000,early_age:174.10000},
{level:5,interval_name:"Hettangian",color:"#4EB3D3",late_age:201.30000,early_age:199.30000},
{level:5,interval_name:"Rhaetian",color:"#E3B9DB",late_age:208.50000,early_age:201.30000},
{level:5,interval_name:"Norian",color:"#D6AAD3",late_age:228.00000,early_age:208.50000},
{level:4,interval_name:"Late Triassic",color:"#BD8CC3",late_age:237.00000,early_age:201.30000},
{level:5,interval_name:"Carnian",color:"#C99BCB",late_age:237.00000,early_age:228.00000},
{level:5,interval_name:"Ladinian",color:"#C983BF",late_age:242.00000,early_age:237.00000},
{level:4,interval_name:"Middle Triassic",color:"#B168B1",late_age:247.20000,early_age:237.00000},
{level:5,interval_name:"Anisian",color:"#BC75B7",late_age:247.20000,early_age:242.00000},
{level:5,interval_name:"Olenekian",color:"#B051A5",late_age:251.20000,early_age:247.20000},
{level:2,interval_name:"Mesozoic",abbrev:"Mz",color:"#67C5CA",late_age:252.17000,early_age:66.00000},
{level:3,interval_name:"Triassic",abbrev:"Tr",color:"#812B92",late_age:252.17000,early_age:201.30000},
{level:4,interval_name:"Early Triassic",color:"#983999",late_age:252.17000,early_age:247.20000},
{level:5,interval_name:"Induan",color:"#A4469F",late_age:252.17000,early_age:251.20000},
{level:5,interval_name:"Changhsingian",color:"#FCC0B2",late_age:254.17000,early_age:252.17000},
{level:4,interval_name:"Lopingian",color:"#FBA794",late_age:259.90000,early_age:252.17000},
{level:5,interval_name:"Wuchiapingian",color:"#FCB4A2",late_age:259.90000,early_age:254.17000},
{level:5,interval_name:"Capitanian",color:"#FB9A85",late_age:265.10000,early_age:259.90000},
{level:5,interval_name:"Wordian",color:"#FB8D76",late_age:268.80000,early_age:265.10000},
{level:4,interval_name:"Guadalupian",color:"#FB745C",late_age:272.30000,early_age:259.90000},
{level:5,interval_name:"Roadian",color:"#FB8069",late_age:272.30000,early_age:268.80000},
{level:5,interval_name:"Kungurian",color:"#E38776",late_age:279.30000,early_age:272.30000},
{level:5,interval_name:"Artinskian",color:"#E37B68",late_age:290.10000,early_age:279.30000},
{level:5,interval_name:"Sakmarian",color:"#E36F5C",late_age:295.50000,early_age:290.10000},
{level:3,interval_name:"Permian",abbrev:"P",color:"#F04028",late_age:298.90000,early_age:252.17000},
{level:4,interval_name:"Cisuralian",color:"#EF5845",late_age:298.90000,early_age:272.30000},
{level:5,interval_name:"Asselian",color:"#E36350",late_age:298.90000,early_age:295.50000},
{level:5,interval_name:"Gzhelian",color:"#CCD4C7",late_age:303.70000,early_age:298.90000},
{level:5,interval_name:"Kasimovian",color:"#BFD0C5",late_age:307.00000,early_age:303.70000},
{level:5,interval_name:"Moscovian",color:"#B3CBB9",late_age:315.20000,early_age:307.00000},
{level:4,interval_name:"Pennsylvanian",color:"#99C2B5",late_age:323.20000,early_age:298.90000},
{level:5,interval_name:"Bashkirian",color:"#99C2B6",late_age:323.20000,early_age:315.20000},
{level:5,interval_name:"Serpukhovian",color:"#BFC26B",late_age:330.90000,early_age:323.20000},
{level:5,interval_name:"Visean",color:"#A6B96C",late_age:346.70000,early_age:330.90000},
{level:3,interval_name:"Carboniferous",abbrev:"C",color:"#67A599",late_age:358.90000,early_age:298.90000},
{level:4,interval_name:"Mississippian",color:"#678F66",late_age:358.90000,early_age:323.20000},
{level:5,interval_name:"Tournaisian",color:"#8CB06C",late_age:358.90000,early_age:346.70000},
{level:5,interval_name:"Famennian",color:"#F2EDC5",late_age:372.20000,early_age:358.90000},
{level:4,interval_name:"Late Devonian",color:"#F1E19D",late_age:382.70000,early_age:358.90000},
{level:5,interval_name:"Frasnian",color:"#F2EDAD",late_age:382.70000,early_age:372.20000},
{level:5,interval_name:"Givetian",color:"#F1E185",late_age:387.70000,early_age:382.70000},
{level:4,interval_name:"Middle Devonian",color:"#F1C868",late_age:393.30000,early_age:382.70000},
{level:5,interval_name:"Eifelian",color:"#F1D576",late_age:393.30000,early_age:387.70000},
{level:5,interval_name:"Emsian",color:"#E5D075",late_age:407.60000,early_age:393.30000},
{level:5,interval_name:"Pragian",color:"#E5C468",late_age:410.80000,early_age:407.60000},
{level:3,interval_name:"Devonian",abbrev:"D",color:"#CB8C37",late_age:419.20000,early_age:358.90000},
{level:4,interval_name:"Early Devonian",color:"#E5AC4D",late_age:419.20000,early_age:393.30000},
{level:5,interval_name:"Lochkovian",color:"#E5B75A",late_age:419.20000,early_age:410.80000},
{level:4,interval_name:"Pridoli",color:"#E6F5E1",late_age:423.00000,early_age:419.20000},
{level:5,interval_name:"Pridoli",color:"#E6F5E1",late_age:423.00000,early_age:419.20000},
{level:5,interval_name:"Ludfordian",color:"#D9F0DF",late_age:425.60000,early_age:423.00000},
{level:4,interval_name:"Ludlow",color:"#BFE6CF",late_age:427.40000,early_age:423.00000},
{level:5,interval_name:"Gorstian",color:"#CCECDD",late_age:427.40000,early_age:425.60000},
{level:5,interval_name:"Homerian",color:"#CCEBD1",late_age:430.50000,early_age:427.40000},
{level:4,interval_name:"Wenlock",color:"#B3E1C2",late_age:433.40000,early_age:427.40000},
{level:5,interval_name:"Sheinwoodian",color:"#BFE6C3",late_age:433.40000,early_age:430.50000},
{level:5,interval_name:"Telychian",color:"#BFE6D1",late_age:438.50000,early_age:433.40000},
{level:5,interval_name:"Aeronian",color:"#B3E1C2",late_age:440.80000,early_age:438.50000},
{level:3,interval_name:"Silurian",abbrev:"S",color:"#B3E1B6",late_age:443.40000,early_age:419.20000},
{level:4,interval_name:"Llandovery",color:"#99D7B3",late_age:443.40000,early_age:433.40000},
{level:5,interval_name:"Rhuddanian",color:"#A6DCB5",late_age:443.40000,early_age:440.80000},
{level:5,interval_name:"Hirnantian",color:"#A6DBAB",late_age:445.20000,early_age:443.40000},
{level:5,interval_name:"Katian",color:"#99D69F",late_age:453.00000,early_age:445.20000},
{level:4,interval_name:"Late Ordovician",color:"#7FCA93",late_age:458.40000,early_age:443.40000},
{level:5,interval_name:"Sandbian",color:"#8CD094",late_age:458.40000,early_age:453.00000},
{level:5,interval_name:"Darriwilian",color:"#74C69C",late_age:467.30000,early_age:458.40000},
{level:4,interval_name:"Middle Ordovician",color:"#4DB47E",late_age:470.00000,early_age:458.40000},
{level:5,interval_name:"Dapingian",color:"#66C092",late_age:470.00000,early_age:467.30000},
{level:5,interval_name:"Floian",color:"#41B087",late_age:477.70000,early_age:470.00000},
{level:3,interval_name:"Ordovician",abbrev:"O",color:"#009270",late_age:485.40000,early_age:443.40000},
{level:4,interval_name:"Early Ordovician",color:"#1A9D6F",late_age:485.40000,early_age:470.00000},
{level:5,interval_name:"Tremadocian",color:"#33A97E",late_age:485.40000,early_age:477.70000},
{level:5,interval_name:"Stage 10",color:"#E6F5C9",late_age:489.50000,early_age:485.40000},
{level:5,interval_name:"Jiangshanian",color:"#D9F0BB",late_age:494.00000,early_age:489.50000},
{level:4,interval_name:"Furongian",color:"#B3E095",late_age:497.00000,early_age:485.40000},
{level:5,interval_name:"Paibian",color:"#CCEBAE",late_age:497.00000,early_age:494.00000},
{level:5,interval_name:"Guzhangian",color:"#CCDFAA",late_age:500.50000,early_age:497.00000},
{level:5,interval_name:"Drumian",color:"#BFD99D",late_age:504.50000,early_age:500.50000},
{level:4,interval_name:"Series 3",color:"#A6CF86",late_age:509.00000,early_age:497.00000},
{level:5,interval_name:"Stage 5",color:"#B3D492",late_age:509.00000,early_age:504.50000},
{level:5,interval_name:"Stage 4",color:"#B3CA8E",late_age:514.00000,early_age:509.00000},
{level:4,interval_name:"Series 2",color:"#99C078",late_age:521.00000,early_age:509.00000},
{level:5,interval_name:"Stage 3",color:"#A6C583",late_age:521.00000,early_age:514.00000},
{level:5,interval_name:"Stage 2",color:"#A6BA80",late_age:529.00000,early_age:521.00000},
{level:1,interval_name:"Phanerozoic",color:"#9AD9DD",late_age:541.00000,early_age:0.00000},
{level:2,interval_name:"Paleozoic",abbrev:"Pz",color:"#99C08D",late_age:541.00000,early_age:252.17000},
{level:3,interval_name:"Cambrian",abbrev:"Cm",color:"#7FA056",late_age:541.00000,early_age:485.40000},
{level:4,interval_name:"Terreneuvian",color:"#8CB06C",late_age:541.00000,early_age:521.00000},
{level:5,interval_name:"Fortunian",color:"#99B575",late_age:541.00000,early_age:529.00000},
{level:3,interval_name:"Ediacaran",color:"#FED96A",late_age:635.00000,early_age:541.00000},
{level:3,interval_name:"Cryogenian",color:"#FECC5C",late_age:850.00000,early_age:635.00000},
{level:2,interval_name:"Neoproterozoic",color:"#FEB342",late_age:1000.00000,early_age:541.00000},
{level:3,interval_name:"Tonian",color:"#FEBF4E",late_age:1000.00000,early_age:850.00000},
{level:3,interval_name:"Stenian",color:"#FED99A",late_age:1200.00000,early_age:1000.00000},
{level:3,interval_name:"Ectasian",color:"#F3CC8A",late_age:1400.00000,early_age:1200.00000},
{level:2,interval_name:"Mesoproterozoic",color:"#FDB462",late_age:1600.00000,early_age:1000.00000},
{level:3,interval_name:"Calymmian",color:"#FDC07A",late_age:1600.00000,early_age:1400.00000},
{level:3,interval_name:"Statherian",color:"#F875A7",late_age:1800.00000,early_age:1600.00000},
{level:3,interval_name:"Orosirian",color:"#F76898",late_age:2050.00000,early_age:1800.00000},
{level:3,interval_name:"Rhyacian",color:"#F75B89",late_age:2300.00000,early_age:2050.00000},
{level:1,interval_name:"Proterozoic",color:"#F73563",late_age:2500.00000,early_age:541.00000},
{level:2,interval_name:"Paleoproterozoic",color:"#F74370",late_age:2500.00000,early_age:1600.00000},
{level:3,interval_name:"Siderian",color:"#F74F7C",late_age:2500.00000,early_age:2300.00000},
{level:2,interval_name:"Neoarchean",color:"#F99BC1",late_age:2800.00000,early_age:2500.00000},
{level:2,interval_name:"Mesoarchean",color:"#F768A9",late_age:3200.00000,early_age:2800.00000},
{level:2,interval_name:"Paleoarchean",color:"#F444A9",late_age:3600.00000,early_age:3200.00000},
{level:1,interval_name:"Archean",color:"#F0047F",late_age:4000.00000,early_age:2500.00000},
{level:2,interval_name:"Eoarchean",color:"#DA037F",late_age:4000.00000,early_age:3600.00000},
{level:1,interval_name:"Hadean",color:"#AE027E",late_age:4600.00000,early_age:4000.00000}
]


timescale_list.each do |x|
  Timescale.where(interval_name: x[:interval_name]).first_or_create.update(x)
end