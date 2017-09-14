<img src=http://imgur.com/aEj2oyC.png>

Video overview: https://www.youtube.com/watch?v=d8-UVMCnNUg

# Introduction

The purpose of this application is to automatically generate a stratigraphic 
column based on the information the user provides using 
Mike Bostock's Data-Driven-Documents Javascript Library (D3.js).  


Thanks to Google Map's wonderful API, the user will also be able to see the 
location of each of those columns on a map in the form of markers if proper 
coordinates are provided when creating a column.  Clicking the markers will open 
an info window with a simplified version of the stratigraphic column.  The user
will be able to open up to four columns of their choosing side by side and 
interact with them.


Furthermore, thanks to svg-crowbar.js, the user will also be able to download 
the column in SVG format and edit it using a SVG editor
(ie: Inkscape, Illustrator...).


# Changelog

stratMap v0.3 August 17, 2017
+ Create a collection/grouping model so user can associate multiple columns
+ Create a collection index/show page where user will be able to access 
  info about the multiple columns associated.
+ Create a map view for collections only?
+ Add ajax capabilities to collections
+ Add map location center presets to collection and normal map view
+ Add legend to collection
+ Add pagination to indexes
+ Add legend to Map View
+ Added some pan and zoom limitations to maps
+ Improved CSS (WIP)


stratMap v0.2 August 17, 2017
+ Improved legend
+ Added Height vs Depth option
+ Fixed bar highlighting
+ Fixed Form JS not running when rendering a view after failing validation.
+ Autocomplete select
+ Fixed conformity appearing in legend
+ Added require_permission to controllers
+ AJAX edit/add forms in column show page
+ Fixed firefox compatibility issues (Tooltip reference x error and wrong Map View column container width)
+ Enabled JS require and tweaked css
+ Added Puerto Rico Geologic Map as WMS overlay to the maps API (experimental).


stratMap v0.1 is live! August 2, 2017


# Notes (v0.3)


Implemented the "collection" feature.  Now it's possible to group a number of columns
and view their collective info/visualizations in a separate page.  

Added many other 'small' features that should improve user experience such as
legend in map view, index pagination, location based map centering etc...

One of the most glaring issues that I overlooked was how the site was displayed
on smaller/bigger screens.  I've made some modifications which should make the
site useable in those kind of devices.  I do need to take some time to create
proper media queries, and I'll probably keep working on them before moving on
to implementing other 'big' features (fossils?).


# Limitations (v0.2)


As with any program in their infancy, this web application has a number of 
limitations that have yet to be addressed.  Some of these limitations are
directly tied to the lack of user customization (layouts, colors, symbology, shapes)
and others due to the absence of corresponding features (fossil representation, 
parasequences...).  Some are major and some are minor.


One of the - what I consider to be - major limitations of this application 
is the inability to generate a "generalized" stratigraphic column.  
This application is basically a fancy stack-bar graph, so by its nature 
the application "assumes" that the user is providing it measurements 
that run along a single line in space.  It doesn't concern itself with what features
(facies, structures, dip angles, etc...) are next to it.  It's therefore not 
possible to represent, for instance, a "rough" sketch of a formation's structure using 
only a single column.  Or at least not without extensive modifications to the 
bars and/or custom SVG patterns.


I believe Map View alleviates this limitation a little by 
providing a sort of "composite view" of multiple columns.  I also plan to add a 
"grouping" feature to help with the creation and view of these composite views.  
These alternatives would of course require more data points and therefore
more work from the user's part.  So it's a trade-off one way or another.


Another limitation has to do with how each bar in the generated column represents 
a certain type of lithology.  This means that -for now- it's not possible to create
a more "expansive" column where each 'layer' represents, say, a formation.  I've an
idea on how do deal with this limitation though, and it shouldn't prove to be too
difficult to implement.


# TODO


There are a few features that I plan to work on in the near future.  That is,
after I give my code a once over and plan/think things out some more.


~~ The first one will be AJAX forms implemented in a column's details
page.  It just seems like a logical UX improvement for at least editing
a column's details.  This phase will include whatever other UX style and features
I can think of (y-axis starting point, feet to M conversion?...) and 
addressing the formation representation issue mentioned above. ~~


Later on I want to add a way to represent fossils/other features 
in the column.  Perhaps on a separate/third column, or maybe as a toggle "overlay".


~~ Grouping, or a sort of tagging and a view where users can see a composite view
of various related columns is another feature that I really want to implement.  
Unlike map view, this "Group View" will hopefully be more detailed and will not
be limited to just 4 or 5 columns in succession. ~~


Finally, I want to experiment with adding overlays such as geologic map overlays 
to the Google Maps API.  I've already found a way to a add WMS data to the map, but I 
need some time to read the documentation/ properly implement it.


# Credits / References


This application makes use of lithologic patterns that were converted into 
SVG Format and distributed by the University of Otago's geology department.  These patterns were
in turn derived from the FDGC's Digital Cartographic Standard for Geologic Map 
Symbolization.


The geologic time interval portion of this site's database is based on the 
Paleobiology Database's "Geological time intervals and time scales".


+ D3js:
https://d3js.org/


+ FGDC Digital Cartographic Standard for Geologic Map Symbolization (PostScript Implementation):
http://pubs.usgs.gov/tm/2006/11A02/


+ Google Maps API V3:
https://developers.google.com/maps/documentation/javascript/


+ PBDB Data Service 1.2 v2:
https://paleobiodb.org/data1.2/


+ SVG Crowbar:
http://nytimes.github.io/svg-crowbar/


+ University of Otago; USGS Inkscape pack instructions and download link:
https://blogs.otago.ac.nz/si-geology/resources/illustrationgraphics-resources/usgs-inkscape-pack-instructions-and-download-link/


+ USGS Geology of Puerto Rico WMS Service:
https://mrdata.usgs.gov/services/pr?request=GetCapabilities&service=WMS&version=1.3.0