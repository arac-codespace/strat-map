
<img src=https://i.imgur.com/YjP4jA9.png>

Video overview: https://www.youtube.com/watch?v=d8-UVMCnNUg

# Introduction

The purpose of this application is to automatically generate a stratigraphic 
column based on the information the user provides using 
Mike Bostock's Data-Driven-Documents Javascript Library (D3.js).  


Thanks to Google Map's wonderful API, the user will also be able to see the 
location of each of those columns on a map in the form of markers if proper 
coordinates are provided when creating a column.  Clicking the markers will open 
an info window with a simplified version of the stratigraphic column.  


Furthermore, thanks to svg-crowbar.js, the user will also be able to download 
the column in SVG format and edit it using a SVG editor
(ie: Inkscape, Illustrator...).

Note: This website's still in active development.  If you have any issues or
suggestions please contact me at: *alex.aguirre0026@gmail.com*


# Changelog
stratMap v0.4.0 TBD
+ Fossil implementation
  * The application makes use of the PBDB's web services to serve
    load icons and provide additional information about the
    taxon specified.
+ General UI improvements
  * Index pages now have sort and search capabilities.
  * Columns in collections now share the same scale.
  * Columns in map view now share the same scale.
  * Changed scaling of the visualization in the main column 
    info page.
+ Bug fixed
  * Records on index and show pages no longer ordered on update time.

stratMap v0.3.1 1/30/2018
+ More improvements to Map View.
   * Columns are now generated through JS.  This fixes the unexpected 
      behaviour of the columns when closing/opening multiple visualizations.
+ Improved Map View layout.
   * Adjusted some padding/margins.
   * Created a script to add dummy data.  About time!
+ 1/27/2018 
   Back from hiatus.
   * Synchronized local environment with server
   * Fixed legend naming issue
+ Changed from using a cloud-based IDE to a local environment
+ Changed development DB from SQlite to PG 
+ Reinstalled bcrypt gem to fix compatibiliy issues with Windows OS


stratMap v0.3 August 17, 2017
+ Created a collection/grouping model so user can associate multiple columns
+ Created a collection index/show page where user will be able to access 
  info about the multiple columns associated.
+ Created a map view for collections only
+ Added ajax capabilities to collections
+ Added map location center presets to collection and normal map view
+ Added legend to collection
+ Added pagination to indexes
+ Added legend to Map View
+ Added some pan and zoom limitations to maps
+ Organized the svg columns for better structure
+ Added zoom buttons to collections and single column show page
+ Scaled down columns size
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



# Notes (v0.4.0 and 0.3.1)


**About v0.4.0**

So, what's new with -- somewhat arbitrarly assigned version number 0.4.0?

The basic fossil functionality has been implemented.  The application will look up the taxon name or query fallback provided on the Paleobiology Database and extract info/thumbnail images from it.  Somewhat related, I also had to change how the columns are scaled.  The application will now scale according to the smallest layer or the average of a group if necessary.  Columns in the collection and map view sections now share the same scale between visualizations.  This means that 100m in one column WILL be 100m in another.  

I've also implemented basic search and sorting for the index pages, fixed some bugs and improved how certain things look.  Page's starting to look a bit better.  I just need to take some time to change all the default bootstrap looking stuff, and maybe go easier on the padding.


---
**About v0.3.1**

Well, Hurricane Maria happened thus the hiatus.  If one good thing came out of the whole situation is that I had a lot of time to reconsider the interface of Map View.  A full screen map with absolute positioned columns may look fancy(?), but the whole thing was not exactly practical.  Ignoring practicality, even if I wanted to keep the old interface I would be forced to incorporate any new features while working around the idiosyncrasies of Google Maps' API.  Now I'm not exactly afraid of taking on the unknown, but I've noticed that the API is very finicky and it doesn't really like to have its place in the DOM tree messed around with.  So who knows what problems that would've brought.

Moreover, I want to add a way to filter data and therefore, I need a place to insert the tools necessary to do so.  The new interface provides more options on where to stash those tools.  It just makes better use of the available space overall.  


# TODO (v0.4)

Next up, statistics and pretty graphs.  Hopefully.

Afterwards, I plan to implement a way to search/filter/sort data in Map View.  


# Credits / References


This application makes use of lithologic patterns that were converted into 
SVG Format and distributed by the University of Otago's geology department.  These patterns were
in turn derived from the FDGC's Digital Cartographic Standard for Geologic Map  Symbolization.

This application makes use of various services provided by the Paleobiology Database Data Service 1.2.


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