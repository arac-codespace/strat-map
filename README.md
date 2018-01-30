
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

Contact: *alex.aguirre0026@gmail.com*


# Changelog

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



# Notes (v0.3 and 0.3.1)
**About v0.3.1**

Well, Hurricane Maria happened thus the hiatus.  If one good thing came out of the whole situation is that I had a lot of time to reconsider the interface of Map View.  A full screen map with absolute positioned columns may look fancy(?), but the whole thing was not exactly practical.  Ignoring practicality, even if I wanted to keep the old interface I would be forced to incorporate any new features while working around the idiosyncrasies of Google Maps' API.  Now I'm not exactly afraid of taking on the unknown, but I've noticed that the API is very finicky and it doesn't really like to have its place in the DOM tree messed around with.  So who knows what problems that would've brought.

Moreover, I want to add a way to filter data and therefore, I need a place to insert the tools necessary to do so.  The new interface provides more options on where to stash those tools.  It just makes better use of the available space overall.  

---
**About v0.3**
Implemented the "collection" feature.  Now it's possible to group a number of columns and view their collective info/visualizations on a separate page.  

Added many other 'small' features that should improve user experience such as legend in map view, index pagination, location based map centering etc...

One of the most glaring issues that I overlooked was how the site was displayed on smaller/bigger screens.  I've made some modifications which should make the site 'prettier' in those kind of devices.  I do need to take some time to create proper media queries, and I'll probably keep working on them before moving on to implementing other 'big' features (fossils?).


# Limitations (v0.3)


As with any program in their infancy, this web application has a number of 
limitations that have yet to be addressed.  Some of these limitations are
directly tied to the lack of user customization (layouts, colors, symbology, shapes) and others due to the absence of corresponding features (fossil representation, parasequences...).  Some are major and some are minor.


One of - what I consider to be - major limitations of this application 
is the inability to generate a "generalized" stratigraphic column".  
This application is basically a fancy stack-bar graph, so by its nature 
the application "assumes" that the user is providing it measurements 
that run along a single point in space.  It doesn't concern itself with what features (facies, structures, dip angles, etc...) are next to it.  It's therefore not 
possible to represent, for instance, a "rough" sketch of a formation's structure using only a single column.  Or at least not without extensive modifications to the bars and/or custom SVG patterns.


I believe Map View alleviates this limitation a little by providing a sort of "composite view" of multiple columns.  With the v0.3 update, I
also added collections which provides the user with more control over what 
info to view in one page. These alternatives do, of course, require more data 
points and therefore more work collecting information.  
So it's a trade-off one way or another.


# TODO (v0.3)

With collections done, the other "essential" feature that I want to implement
is a way to represent fossils on a column.  This is something that I'm still
not sure how to implement -visually-, and it should prove to be a challange to
implement on the back end.  Inspired by Macrostrat's integration of
PBDM's services, I have this idea of making use of PaleoDB's web services to 
display basic fossil information on the site too... somehow.  

After that, I plan to implement some form of basic statistics functions and
some pretty graphs to go along with it.  I'm actually a bit excited about this
part, since this will be the first time I will be doing some mathy code.

Another thing I should be implementing soon is the option of rendering multiple columns using a single scale for Map View and Collections.  Currently, every column has their own scale which is fine when considering a single column.  However, the different scales can be misleading when trying to compare multiple columns side by side.

Finally, I also plan to implement a way to search/filter/sort data in Map View.  This will perhaps be the most difficult part of the project, as I wish this function to be specific enough to serve as another powerful interpretative tool.  I should be fairly certain about the structure of my database before I even attempt doing this.  So this may be among the last features I add to the website. 


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