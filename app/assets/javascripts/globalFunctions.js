/* global $*/
/* global d3 */

// Repository for functions used repeatedly throughout the application

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Autocomplete js for forms...
function fireAutoComplete() {
  // Initial binding of autocomplete...
  $('.timescale_name').autocomplete({
    // Note that in html, autocomplete_source is converted to autocomplete-source
    source: $('.timescale_name').data('autocomplete-source'),
    minLength: 3
  });

  $('.lithology_name').autocomplete({
    source: $('.lithology_name').data('autocomplete-source'),
    minLength: 3
  });

  // Jquery source takes a function as param
  // request.term is what the user types
  // response is the callback array
  // to populate the autocompletion
  $('input.taxon-name').autocomplete({
    source: function(request, response) {
      jQuery.get('https://paleobiodb.org/data1.2/taxa/auto.json', {
        name: request.term
      }, function(data) {
        var array = [];
        $.each(data.records, function(key, val) {
          // debugger;
          array.push(val.nam);
        });
        response(array);
      });
    },
    minLength: 3
  }); // taxon-name
}

// Simple function definition to check url...
function urlExists(url, callback) {
  fetch(url)
  .then(function(status) {
    callback(status);
  });
}

function buildPBDBHtml(fossilURL, fossilTooltip, localInfoHTML) {

  var dict = {};
  var firstIndex=0;
  $.getJSON(fossilURL, function(data){
    $.each(data.records[firstIndex], function(key, val){
        switch (key){
          case 'jmo':
            dict[key] = `${val}`;
            break;
          case 'ext':
            if (val) {
              dict[key] = 'True';
            } else {
              dict[key] = 'False';
            }
            break;
          case 'tei':
            dict[key]= `${val}`;
            break;
          case 'tli':
            dict[key]= `${val}`;
            break;
          case 'phl':
            dict[key]= `${val}`;
            break;
          case 'cll':
            dict[key]= `${val}`;
            break;
          case 'odl':
            dict[key]= `${val}`;
            break;
          case 'fml':
            dict[key]= `${val}`;
            break;
          case 'gnl':
            dict[key]= `${val}`;
            break;
          case 'ttl':
            dict[key]= `${val}`;
            break;
          case 'jlh':
            dict[key]= `${val}`;
            break;
          case 'jvs':
            dict[key]= `${val}`;
            break;
          case 'jdt':
            dict[key]= `${val}`;
            break;
          case 'jco':
            dict[key]= `${val}`;
            break;
          default:
            '';
        } // switch end
      });

      // Create PBDB HTML to insert stuff
      let pbdbHTML =
        ` </br>
         <strong>PBDB Additional Information </strong> </br>
         <strong>Phylum:</strong> ${dict['phl']} </br>
         <strong>Class:</strong> ${dict['cll']} </br>
         <strong>Order:</strong> ${dict['odl']} </br>
         <strong>Family:</strong> ${dict['fml']} </br>
         <strong>Genus:</strong> ${dict['gnl']} </br>
         <strong>Extant:</strong> ${dict['ext']} </br>
         <strong>Early Interval:</strong> ${dict['tei']} </br>
         <strong>Late Interval:</strong> ${dict['tli']} </br> 
         <strong>Type Taxon:</strong> ${dict['ttl']} </br>
         <strong>Taxon Environment:</strong> ${dict['jev']} </br>
         <strong>Motility:</strong> ${dict['jmo']} </br>
         <strong>Life Habit:</strong> ${dict['jlh']} </br>
         <strong>Vision:</strong> ${dict['jvs']} </br>
         <strong>Diet:</strong> ${dict['jdt']} </br>          
        `;

      fossilTooltip.html(localInfoHTML + pbdbHTML);
  }).fail(function(){
    fossilTooltip.html(localInfoHTML);
  });
} // function end



// Map search bar fade in
function fadingIn() {
  $('#pac-input').fadeIn('fast');
}

// StratColumn bar coloring
// This function returns the color of the bar
// according to the d.lithology.classification
function lithologyColoring(lithologyClass) {
  if (lithologyClass == 'Sandstone' ||
      lithologyClass == 'Breccia' ||
      lithologyClass == 'Conglomerate' ||
      lithologyClass == 'Ironstone' ||
      lithologyClass == 'Phosphatic') {
    return '#fbf7af';
  } else if (lithologyClass == 'Mudrock' ||
    lithologyClass == 'Siliceous' ||
    lithologyClass == 'Interbedded-mudrock') {
    return '#d2d3d3';
  } else if (lithologyClass == 'Carbonate' ||
    lithologyClass == 'Evaporite') {
    return '#6caad5';
  } else if (lithologyClass == 'Igneous') {
    return '#f05a89';
  } else if (lithologyClass == 'Volcanic' ||
    lithologyClass == 'Volcanoclastic') {
    return '#a1258e';
  } else if (lithologyClass == 'Metamorphic') {
    return '#4d25a1';
  } else if (lithologyClass == 'Other') {
    return '#ff6b6b';
  } else {
    return 'transparent';
  }
}

// StratColumn bar unconformities
function generateUnconformity(dynFill, i, type, id = 0) {
  var patternPath =
    `<g transform="rotate(-180 125.319091796875,22.8419189453125) ">
      <path fill = ${dynFill} 
        d="m35.65581,28.28433c5.93317,-4.22123 11.86634,
        -16.88482 23.73269,-16.88482c11.86634,0 11.86634,
        16.88482 23.73268,16.88482c11.86634,0 11.86634,
        -16.88482 23.73269,-16.88482c11.86634,
        0 11.86634,16.88482 23.73253,16.88482c11.86634,
        0 11.86634,-16.88482 23.73269,-16.88482c11.86634,
        0 11.86634,16.88482 23.73269,16.88482c11.86634,
        0 11.86634,-16.88482 23.73269,-16.88482c11.86634,
        0 11.86634,16.88482 23.73252,16.88482c11.86651,
        0 11.86651,-16.88482 23.73269,-16.88482c11.86635,
        0 17.79952,12.6636 23.73269,16.32332" 
        stroke-width="2" stroke= "black" 
        fill-rule="evenodd" fill="transparent"/>
    </g>`;
  if (type == 'texture') {
    d3.select('.unconformityPatterns > defs')
    .append('pattern').attr('id', 'unconformity-' + i)
    .attr('patternUnits', 'userSpaceOnUse').attr('x', '0')
    .attr('y', '-18').attr('width', '50').attr('height', '9999')
    .html(patternPath);

    return 'url(#unconformity-' + i + ')';
  } else if (type == 'color') {
    d3.select('.unconformityPatterns > defs').append('pattern')
    .attr('id', 'unconformity-color' + i)
    .attr('patternUnits', 'userSpaceOnUse').attr('x', '0')
    .attr('y', '-18').attr('width', '50').attr('height', '9999')
    .html(patternPath);

    return 'url(#unconformity-color' + i + ')';
  } else if (type == 'legend') {
    d3.select('.unconformityPatterns > defs').append('pattern')
    .attr('id', 'unconformity-legend' + i)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('x', '0').attr('y', '-12').attr('width', '50').attr('height', '9999')
    .html(patternPath);

    return 'url(#unconformity-legend' + i + ')';
  } else if (type == 'multiColor') {
    d3.select('.unconformityPatterns > defs')
    .append('pattern')
    .attr('id', 'unconformity-color' + i + '-id-' + id)
    .attr('patternUnits', 'userSpaceOnUse').attr('x', '0')
    .attr('y', '-18').attr('width', '50').attr('height', '9999')
    .html(patternPath);

    return 'url(#unconformity-color' + i + '-id-' + id + ')';
  } else if (type == 'multiTexture') {
    d3.select('.unconformityPatterns > defs')
    .append('pattern')
    .attr('id', 'unconformity-' + i + '-id-' + id)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('x', '0').attr('y', '-18').attr('width', '50')
    .attr('height', '9999').html(patternPath);

    return 'url(#unconformity-' + i + '-id-' + id + ')';
  } else {
    console.log('generateUnconformity: Type argument invalid');
  }
}

// Google map style
function googleStyleList() {
  var styleList = [{
    'stylers': [{
      'hue': '#bbff00'
    }, {
      'weight': 0.5
    }, {
      'gamma': 0.5
    }]
  }, {
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'off'
    }]
  }, {
    'featureType': 'landscape.natural',
    'stylers': [{
      'color': '#a4cc48'
    }]
  }, {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#ffffff'
    }, {
      'visibility': 'on'
    }, {
      'weight': 1
    }]
  }, {
    'featureType': 'administrative',
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'on'
    }]
  }, {
    'featureType': 'road.highway',
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'simplified'
    }, {
      'gamma': 1.14
    }, {
      'saturation': -18
    }]
  }, {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'labels',
    'stylers': [{
      'saturation': 30
    }, {
      'gamma': 0.76
    }]
  }, {
    'featureType': 'road.local',
    'stylers': [{
      'visibility': 'simplified'
    }, {
      'weight': 0.4
    }, {
      'lightness': -8
    }]
  }, {
    'featureType': 'water',
    'stylers': [{
      'color': '#4aaecc'
    }]
  }, {
    'featureType': 'landscape.man_made',
    'stylers': [{
      'color': '#718e32'
    }]
  }, {
    'featureType': 'poi.business',
    'stylers': [{
      'saturation': 68
    }, {
      'lightness': -61
    }]
  }, {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'weight': 2.7
    }, {
      'color': '#f4f9e8'
    }]
  }, {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry.stroke',
    'stylers': [{
      'weight': 1.5
    }, {
      'color': '#e53013'
    }, {
      'saturation': -42
    }, {
      'lightness': 28
    }]
  }];

  return styleList;
}


// Bulk of the legend generator
function condensedLegend(
  legendContainer, filteredData, ageFilteredData,
  width, lithologyFilteredData) {

    // Modifying legend position for the strat_column show column
    let positionAdjust = {
      showView: 185,
      condensedView: 100
    };

    let legendRectSize = {
      height: 26,
      width: 52
    };

    let legendSpacing = 8;
    let lHeight = legendRectSize.height + legendSpacing;
    let horz;
    let firstIndex = 0;

    if ($('.strat_columns.show').length) {
      // moves legend to the right
      horz = width + positionAdjust.showView;
    } else {
      // moves legend to the left
      horz = width - positionAdjust.condensedView;
    }

  let legend = legendContainer.selectAll('.legend')
    .data(filteredData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      // This will determine spacing between legend rects
      let vert;
      let skipIndex = 1;
      let rowSkip = i+skipIndex;
      let vertAdjust = 5;
      if (i >= ageFilteredData.length) {
        vert = (rowSkip) * lHeight;
        return 'translate(' + horz + ',' + (vert + vertAdjust) + ')';
      } else {
        vert = (i) * lHeight;
        // 5 for top margin when height is multiplied by index 0
        return 'translate(' + horz + ',' + (vert + vertAdjust) + ')';
      }
    });

  legend.append('rect')
    .attr('width', legendRectSize.width)
    .attr('height', legendRectSize.height)
    .style('fill', function(d, i) {

      if (i >= lithologyFilteredData.length + ageFilteredData.length) {

        if (d.key == 'Depositional') {
          // GENERATE UNCONFORMITY PATTERNS DYNAMICALLY
          let dynFill = 'transparent';

          // Prevents NaN by preventing .previous operation from occuring
          // at data index 0
          if (i > firstIndex) {
            dynFill = 'url(' + d.key + ')';
          }
          return generateUnconformity(dynFill, i, 'legend');
        } else if (d.key === 'Tectonic') {
          return 'url(#tectonic)';
        } else if (d.key === 'Intrusion') {
          return 'url(#intrusion)';
        } else {
          return 'transparent';
        }
      } else if (i >= ageFilteredData.length) {
        d3.select(this.parentNode).append('rect')
        .attr('width', legendRectSize.width)
        .attr('height', legendRectSize.height)
        .style('fill', function(d) {
          return 'url(' + d.values[firstIndex].key + ')';
        }).style('stroke', 'black:');
        return lithologyColoring(
          d.values[firstIndex].values[firstIndex].lithology.classification);
      } else {
        return d.values[firstIndex].key;
      }
    })
    .style('stroke', 'black');

  legend.append('text')
    .attr('x', 75)
    .attr('y', (legendRectSize.height - legendSpacing) - 2)
    .text(function(d) {
      if (d.key == 'Depositional') {
        return d.key + ' unconformity';
      } else {
        return d.key;
      }
    })
      .style('font', '12px Tahoma');
  // Modifying text position for the show legend...
  if ($('.strat_columns.show').length) {
    d3.selectAll('.legendContainer')
    .selectAll('text').attr('x','70px')
    .style('text-anchor','start');
  }
}

function condensedColumnGenerator(
  data, height, width,
  stratIdSelect, margin,fossilBool) {


  var totalThickness = d3.sum(data, function(d) {
    return parseFloat(d.thickness);
  });

  // Determines y-axis orientation and range by checking for depth
  let FIRSTLAYERINDEX = 0;
  let findColumnDepth = data[FIRSTLAYERINDEX].strat_column.depth;
  let RANGEBOUNDARY = 0;
  let yRange = [];

  // If depth is false, flip the y-axis
  if (findColumnDepth == true) {
    // debugger;
    yRange = [RANGEBOUNDARY, height];
  } else {
    yRange = [height, RANGEBOUNDARY];
  }

  // y and x axis scale
  let y = d3.scaleLinear();
  let x = d3.scaleBand();

  // Sets y-axis range
  y.range(yRange);

  let stratChart = d3.select(stratIdSelect)
  .attr('width', '100%')
  .attr('height', height + margin.top + margin.bottom)
  .append('g').attr('class', 'columnContainer');

  let DOMAINBOUNDARY = 0;

  // Sets upper domain to the max thickness.
  y.domain([DOMAINBOUNDARY, totalThickness]);
  // Defines the previous function to store previous thickness value up next
  for (let i = 0; i < data.length; i++) {
    let prevIndex = 1;
    data[i].previous = data[i-prevIndex];
  }

  // For use inside the function.  This allows for the
  // sum of successive thickness.
  let sumPrevThickness = 0;

  // Bar data bind and transformation
  let bar = stratChart.selectAll('g').data(data).enter().append('g')
  .attr('id',function(d){
    return `layerGrouping_${d.id}`;
  })
  .attr('class','gLayer')
  .attr('transform', function(d, i) {
    // Note that i refers to the number of objects!
    // Empty var to store previous thickness
    var prevThickness = 0;
    var firstIndex = 0;
    var transSum;

    // To avoid NaN error, make the var 0 when the index is greater than 0
    // ie.  No previous index exist before index 0/ first data array
    if (i > firstIndex) {
      prevThickness = parseFloat(d.previous.thickness);
    }

    // Var defined outside of loop allows for the addition of the
    // prevThickness value due to how the function loop works.
    sumPrevThickness += prevThickness;
    if (findColumnDepth == false) {
      transSum = y(RANGEBOUNDARY) - y(sumPrevThickness);
    } else {
      transSum = y(sumPrevThickness);
    }

    // This is the value that will translate-y the bars right to the top of
    // the bar located below.  IE: Stack bars.
    return 'translate(0,' + transSum + ')';
  });




  // LITHOLOGY Color!
  let x2 = x.copy();
  let X2PADDING = 0;
  let X2ALIGN = 0.25;
  x2.rangeRound([RANGEBOUNDARY, width])
  .domain(['Lithology']).padding(X2PADDING).align(X2ALIGN);

  // Append bar for texture
  bar.append('rect').attr('class', 'bar').attr('fill', function(d) {
    if ($('.interbedded-carbonate').length) {
      // Extra coloring rule to color carbonate features
      // in interbedded patterns
      $('.interbedded-carbonate').attr('fill', '#6caad5');
    }
    let lithologyClass = d.lithology.classification;

    // Pass class to lithologyColoring function will return
    // a color string
    return lithologyColoring(lithologyClass);
  }).attr('width', function() {
    return x2.bandwidth();
  }).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('x', function() {
    return x2('Lithology');
  });


  // LITHOLOGY
  // Append bar for texture
  bar.append('rect')
  .attr('class', 'bar toggleFossil lithTexture')
  .attr('fill', function(d) {
    // Here I can just return the url stored in the lithology json object!
    var patternSelect = d.lithology.url;

    // To prevent the pattern scaling operation from
    // being done more than once...
    if (!$(patternSelect + '> g').hasClass(patternSelect)) {
      let patternWidth = $(patternSelect).attr('width');
      let patternHeight = $(patternSelect).attr('height');
      let SCALEFACTOR = 4;

      $(patternSelect + '> g').addClass(patternSelect);
      $(patternSelect + '> g').attr('transform', `scale(${SCALEFACTOR})`);
      $(patternSelect).attr('width', patternWidth * SCALEFACTOR);
      $(patternSelect).attr('height', patternHeight * SCALEFACTOR);
      $(patternSelect).attr('x', '15');
      $(patternSelect).attr('y', '20');
    }
    return 'url(' + patternSelect + ')';
  }).attr('width', function() {
    return x2.bandwidth();
  }).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('x', function() {
    return x2('Lithology');
  });

  // CREATE unconformityPatterns container for dynamic pattern creation
  let NODIMENSIONS = 0;
  if (!$('.unconformityPatterns').length) {
    d3.select('body').append('svg')
    .attr('class', 'unconformityPatterns')
    .attr('width', NODIMENSIONS).attr('height', NODIMENSIONS)
    .attr('display', 'absolute').append('defs');
  }

  // UNCONFORMITY COLOR

  // If user indicates an unconformity...
  bar.append('rect')
  .attr('class', 'unconformity-color toggleFossil')
  .attr('fill', function(d, i) {
    var contact_type = d.contact.contact_type;

    if (contact_type === 'Depositional') {

      // GENERATE COLORS FOR UNCONFORMITY PATTERNS DYNAMICALLY
      let dynFill = 'transparent';

      // Prevents NaN from performing a previous operation on data index 0
      let INDEXZERO = 0;
      if (i > INDEXZERO) {

        let lithologyClass = d.previous.lithology.classification;

        // Pass to coloring function and assign the fill to the dynFill var...
        dynFill = lithologyColoring(lithologyClass);
      }

      // return 'url(#unconformity-color' + i + '-id-' + d.id + ')';
      return generateUnconformity(dynFill, i, 'multiColor', d.id);
    } else {
      return 'transparent';
    }
  }).attr('width', width).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('stroke', 'transparent');

  // UNCONFORMITIES Textures
  // If user indicates an unconformity...
  bar.append('rect').attr('class', 'unconformity toggleFossil')
  .attr('fill', function(d, i) {
    var contact_type = d.contact.contact_type;

    if (contact_type === 'Depositional') {

      // GENERATE UNCONFORMITY PATTERNS DYNAMICALLY

      let dynFill = 'transparent';

      // Prevents NaN by preventing .previous operation from occuring
      // at data index 0
      let INDEXZERO = 0;
      if (i > INDEXZERO) {
        dynFill = 'url(' + d.previous.lithology.url + ')';
      }

      return generateUnconformity(dynFill, i, 'multiTexture', d.id);
    } else if (contact_type === 'Tectonic') {
      return 'url(#tectonic)';
    } else if (contact_type === 'Intrusion') {
      return 'url(#intrusion)';
    } else {
      return 'transparent';
    }
  }).attr('width', function() {
    return width;
  }).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('stroke', 'transparent');

  // HOVER RECT
  bar.append('rect').attr('class', 'hoverBar toggleFossil')
  .attr('fill', 'transparent'
  ).attr('width', function() {
    return x2.bandwidth();
  }).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('x', function(){
    return x2('Lithology');
  });

  // GEOLOGIC AGE
  let x3 = x.copy();
  let BYHALF = 2;
  let X3PADDING = 0.5;
  let X3ALIGN = 0;
  x3.rangeRound([RANGEBOUNDARY, width / BYHALF])
  .domain(['Age']).padding(X3PADDING).align(X3ALIGN);

  // Append bar for age
  bar.append('rect').attr('class', 'age').attr('fill', function(d) {
    return d.timescale.color;
  }).attr('width', function() {
    return x3.bandwidth();
  }).attr('height', function(d) {
    if (findColumnDepth == false) {
      return y(RANGEBOUNDARY) - y(parseFloat(d.thickness));
    } else {
      return y(parseFloat(d.thickness));
    }
  }).attr('x', function() {
    return x3('Age');
  });


  // Fossil append...
  if (fossilBool) {
    let x4 = x.copy();
    let X4PADDING = 0.30;
    let X4ALIGN = 0.45;
    x4.rangeRound([RANGEBOUNDARY, width])
    .domain(['Fossil Content']).padding(X4PADDING).align(X4ALIGN);

    let imgsInRow = 3;
    let imgWidth = 26;

    bar.each(function(d){
      d3.select(this).selectAll('image')
      .data(d.fossils).enter()
      .append('image')
      .attr('class', function(d, i){
        // This assigment will allow me to select
        // image container and assign the proper href
        // Also, overflowing imgs will be hidden by
        // default
        let OVERFLOWING = 2;
        if (i>OVERFLOWING){
          return 'fossil-content' + ' ' + 'fossil-overflow' ;
        }
        return 'fossil-content';
      })
      .attr('id', function(d){
        return 'fossil-' + d.id;
      })
      .style('display','none')
      .attr('width', '20').attr('height','20').attr('x',function(d,i){

        let spacing = x4('Fossil Content');
        // Modulo basically allows only x imgsInRow
        // if x imgWidth wide to be side by side

        return spacing + i%imgsInRow*imgWidth;

      }).attr('y', function(d,i){

        // Here we divide by the num of items we want by row
        // and floor it to get the row num.
        // Be aware that if you want to change items per
        // row, you must change the 'x' attribute unless
        // you want things to look funky.
        let rowTracking = Math.floor(i/imgsInRow);
        let verticalSpace = 22;
        return rowTracking*verticalSpace;

      }).each( function(d){

        // All right! Here I use .each which allows
        // me to call a function for each of the
        // d.fossils objects.

        var fossilQuery = encodeURIComponent(d.name.trim());
        var fossilID = 'fossil-' + d.id;
        var fossilHTTP =
        `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;

        // Here I can access the parameters of the fetch response
        // object.  Params include ok, status, redirected etc...
        // urlExists is defined in globalFunctions

        urlExists(fossilHTTP, function(exists){
          if (exists.ok) {
            d3.select(`#${fossilID}`)
            .attr('xlink:href', fossilHTTP)
            .attr('data-query-succeed', fossilQuery);

          } else if (!exists.ok && d.query !== null && d.query !== '') {

            fossilQuery = encodeURIComponent(d.query.trim());
            fossilHTTP =
            `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;
            urlExists(fossilHTTP, function(exists) {
              if (exists.ok){
                d3.select(`#${fossilID}`)
                .attr('xlink:href', fossilHTTP)
                .attr('data-query-succeed', fossilQuery);
              } else {
                d3.select(`#${fossilID}`)
                .attr('xlink:href', '/assets/qmark.svg');
              }
            });
          } else {
            d3.select(`#${fossilID}`)
            .attr('xlink:href', '/assets/qmark.svg');
          }
        });
      });
    });
  }

  // x3-axis geologic age line and ticks
  stratChart.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x3).tickSizeOuter([0]))
  .selectAll('.tick text');

  // x2-axis lithology line and ticks
  stratChart.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x2)).selectAll('.tick text');

  // y-axis line and ticks
  let yAxisText;
  if (findColumnDepth == false) {
    yAxisText = 'HEIGHT (m)';
  } else {
    yAxisText = 'DEPTH (m)';
  }

  let TICKFREQUENCY = 2;
  let YPOSITION = -55;
  stratChart.append('g').attr('class', 'axis axis--y')
  .call(d3.axisLeft(y).ticks(data.length*TICKFREQUENCY))
  .append('text').attr('transform', 'rotate(-90)')
  .attr('y', YPOSITION).attr('x', '-15%')
  .attr('dy', '0.71em').text(yAxisText);

  // In maps.js, you must remove the previous tooltip to erase the
  // binded data and get the binded data when new windows are opened
  if ($('.tool').length) {
    $('.tool').remove();
  }
  // Tooltip D3 settings
  let tooltip = d3.select('body')
  .append('div').attr('class', 'tool')
  .style('background-color', 'white')
  .style('color','black').style('border', '1px solid black')
  .style('padding', '6px').style('border-radius', '8px')
  .style('position', 'absolute').style('z-index', '10')
  .style('visibility', 'hidden').style('font-size', '12px')
  .style('font-family', 'Tahoma').style('max-width','350px');

  // Tooltip action
  let description;
  let lithNameAssembler;
  d3.selectAll('.hoverBar').on('mouseover', function(d) {

    if (d.description !== '') {
      description = `</br><strong>Description:</strong> ${d.description}`;
    } else {
      description = '';
    }

    if (d.lithology.name3 !== '') {
      lithNameAssembler =
      `${d.lithology.name} / ${d.lithology.name2} / ${d.lithology.name3}`;
    } else if (d.lithology.name2 !== '') {
      lithNameAssembler = `${d.lithology.name} / ${d.lithology.name2}`;
    } else {
      lithNameAssembler = `${d.lithology.name}`;
    }

    return tooltip.style('visibility', 'visible')
    .html(

      `<strong>Name:</strong> ${d.name}
      </br><strong>Formation:</strong> ${d.formation}
      </br><strong>Geologic Age:</strong> ${d.timescale.interval_name}
      </br><strong>Upper Contact:</strong> ${d.contact.name}     
      </br><strong>Thickness (m):</strong> ${d.thickness}
      </br><strong>Lithology Pattern (m):</strong>
      ${lithNameAssembler}        
      ${description}`
      );
  }).on('mousemove', function() {
    let YTOOLPOSITION = 120;
    let XTOOLPOSITION = 20;
    let toolWidth = $('.tool').css('width');

    return tooltip.style('top', (d3.event.pageY - YTOOLPOSITION) + 'px')
    .style('left', function(){
      // This section allows tooltip to not collide with right margin!
      var collectionDivWidth = $('.tooltip-hover-aid').css('width');
      if (d3.event.pageX > parseInt(collectionDivWidth)/2) {
        return (d3.event.pageX - parseInt(toolWidth) - XTOOLPOSITION) + 'px';
      } else {
        return d3.event.pageX + XTOOLPOSITION + 'px';
      }
    });
  }).on('mouseout', function() {
    return tooltip.style('visibility', 'hidden');
  });

  if (fossilBool){
    // FossilTooltip
    let fossilTooltip = d3.select('html')
    .append('div').attr('class', 'tool fossil-tooltip')
    .style('background-color', 'white')
    .style('color','black').style('border', '1px solid black')
    .style('padding', '6px').style('border-radius', '8px')
    .style('position', 'absolute').style('z-index', '10')
    .style('visibility', 'hidden').style('font-size', '12px')
    .style('font-family', 'Tahoma').style('max-width','350px');

    // Tooltip action for fossils
    d3.selectAll('.fossil-content').on('mouseover', function(d){

      var localInfoHTML =
      `<strong>Name:</strong> ${d.name}
       </br><strong>Abundance:</strong> ${d.abundance}
       </br><strong>Notes:</strong> ${d.notes}
       </br>      
      `;

      // The image append operation includes a part to attach
      // data-query-succeed if it finds a
      // matching record.  Here I use the data attribute
      // to compose the URL where the data is.

      var fossilQuery = d3.select(this).attr('data-query-succeed');

      var fossilURL =
      `https://paleobiodb.org/data1.2/taxa/single.json?name=${fossilQuery}&show=full`;

      // Defined in globalFunctions...
      buildPBDBHtml(fossilURL, fossilTooltip, localInfoHTML);

      return fossilTooltip.style('visibility', 'visible');
    }).on('mousemove', function() {
      let YTOOLPOSITION = 60;
      let XTOOLPOSITION = 15;

      return fossilTooltip.style('top', d3.event.pageY - YTOOLPOSITION + 'px')
      .style('left', d3.event.pageX + XTOOLPOSITION + 'px');
    }).on('mouseout', function() {
      return fossilTooltip.style('visibility', 'hidden');
    });
  }
}

// Restricts bound pan
// https://stackoverflow.com/questions/23580831/how-to-block-google-maps-api-v3-panning-in-the-gray-zone-over-north-pole-or-unde
function checkBounds(map) {

var latNorth = map.getBounds().getNorthEast().lat();
var latSouth = map.getBounds().getSouthWest().lat();
var newLat;

if (latNorth<85 && latSouth>-85) {
  /* in both side -> it's ok */
    return;
} else {
    if (latNorth>85 && latSouth<-85)   /* out both side -> it's ok */
        return;
    else {
        if (latNorth>85)
            newLat =  map.getCenter().lat() - (latNorth-85);   /* too north, centering */
        if (latSouth<-85)
            newLat =  map.getCenter().lat() - (latSouth+85);   /* too south, centering */
    }
}
if (newLat) {
    let newCenter= new google.maps.LatLng( newLat ,map.getCenter().lng() );
    map.setCenter(newCenter);
    }
}

function zoomColumn(){
  // Append zoom behaviour
  let zoomIn = d3.select('.columnZoomIn');
  let zoomOut = d3.select('.columnZoomOut');
  let SCALENUM = 1;
  let MAXZOOM = 1;
  let MINZOOM = 0.75;

  zoomIn.on('click', function(){
    if (SCALENUM < MAXZOOM) {
      SCALENUM += 0.1;
  	  d3.selectAll('.stratChart > g.columnContainer, .stratChart > g.legendContainer')
      .style('transform', `scale(${SCALENUM})`);
      // Get height of columnContainer

      let heightArray = [];
      d3.selectAll('.columnContainer')
      .each( function() {
        let height = parseInt(this.getBoundingClientRect().height);
        heightArray.push(height);
      });

      let columnContainerHeight = Math.max(...heightArray);
      // Set stratChart Height to recalculated height...
      d3.selectAll('.stratChart')
      .attr('height', columnContainerHeight + 75);
    }
  });

  zoomOut.on('click', function(){
    if (SCALENUM > MINZOOM) {
      SCALENUM -= 0.1;
      d3.selectAll('.stratChart > g.columnContainer, .stratChart > g.legendContainer')
      .style('transform', `scale(${SCALENUM})`);
      // Get height of columnContainer

      let heightArray = [];
      d3.selectAll('.columnContainer')
      .each( function() {
        let height = parseInt(this.getBoundingClientRect().height);
        heightArray.push(height);
      });

      let columnContainerHeight = Math.max(...heightArray);
      // Set stratChart Height to recalculated height...
      d3.selectAll('.stratChart')
      .attr('height', columnContainerHeight + 75);
    }
  });
}