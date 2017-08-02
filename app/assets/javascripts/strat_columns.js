/*global $*/
/*global d3*/
$(document).on('turbolinks:load', function () {
  // Return nothing unless the controller corresponds...
  if ($('.strat_columns.show').length !== 1) {
    return;
  }

  function drawchart(data) {
    var thickness_h = d3.sum(data, function (d) {
      return parseFloat(d.thickness);
    });

    var margin = {
      top: 40,
      right: 50,
      bottom: 125,
      left: 60
    };
    var width = 600 - margin.left - margin.right;
    var height = 80 * Math.sqrt(thickness_h);
    if (height < 300) {
      height = 300;
    } else if (height > 2000) {
      height = 2000;
    }
    //500

    // x-axis scale!
    var x = d3.scaleBand();

    // y-axis scale!    
    var y = d3.scaleLinear().range([height, 0]);

    // Selects the svg container and sets width attribute.  
    // NOTE: I'm using 100% to allow the svg to occupy the container's
    // full width.  For a more static approach you can use
    // width + margin.left + margin.right which in the current settings
    // will compute to 600px.  This is also the dimensions the x-scale
    // is based on.
    var stratChart = d3.select('.stratChart').attr('width', '100%');
    // Sets the height for the svg/chart container.
    stratChart.attr('height', height + margin.top + margin.bottom);
    // .append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');;    
    // For use inside the function.  This allows for the sum of successive thickness.
    var sumPrevThickness = 0;
    // Just sums the thickness of all the datasets in the JSON.
    var totalThickness = d3.sum(data, function (d) {
      return parseFloat(d.thickness);
    });
    // Sets upper domain to the max thickness.
    y.domain([0, totalThickness]);
    // Defines the previous function to store previous thickness value up next
    for (var i = 0; i < data.length; i++) {
      data[i].previous = data[i - 1];
    }

    // Bar data bind and transformation
    var bar = stratChart.selectAll('g').data(data).enter().append('g').attr('transform', function (d, i) {
      // Note that i refers to the number of objects!
      // Empty var to store previous thickness
      var prevThickness = undefined;
      // To avoid NaN error, make the var 0 when the index is greater than 0
      // ie.  No previous index exist before index 0/ first data array
      if (i > 0) {
        prevThickness = parseFloat(d.previous.thickness);
      } else {
        prevThickness = 0;
      }
      // Var defined outside of function allows for the addition of the 
      // prevThickness value due to how the function loop works.
      sumPrevThickness += prevThickness;
      var transSum = y(0) - y(sumPrevThickness);
      // This is the value that will translate-y the bars right to the top of
      // the bar located below.  IE: Stack bars.
      return 'translate(0,' + transSum + ')';
    });

    var x2 = x.copy();
    x2.rangeRound([0, width]).domain(['Lithology']).padding(0.5).align(0.25);

    // LITHOLOGY Color!
    // Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', function (d) {
      if ($('.interbedded-carbonate').length >= 1) {
        $('.interbedded-carbonate').attr('fill', '#6caad5');
      }
      var lithologyClass = d.lithology.classification;

      // Pass class to lithologyColoring function will return
      // a color string
      return lithologyColoring(lithologyClass);
    }).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      return y(0) - y(parseFloat(d.thickness));
    }).attr('x', function (d) {
      return x2('Lithology');
    });

    // LITHOLOGY
    // Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', function (d) {
      // Here I can just return the url stored in the lithology json object!
      var patternSelect = d.lithology.url;

      // To prevent the pattern scaling operation from being done more than once...
      if (!$(patternSelect + '> g').hasClass(patternSelect)) {
        var patternWidth = $(patternSelect).attr('width');
        var patternHeight = $(patternSelect).attr('height');

        $(patternSelect + '> g').addClass(patternSelect);
        $(patternSelect + '> g').attr('transform', 'scale(4)');
        $(patternSelect).attr('width', patternWidth * 4);
        $(patternSelect).attr('height', patternHeight * 4);
        $(patternSelect).attr('x', '15');
        $(patternSelect).attr('y', '20');
      }
      return 'url(' + patternSelect + ')';
    }).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      return y(0) - y(parseFloat(d.thickness));
    }).attr('x', function (d) {
      return x2('Lithology');
    });

    // UNCONFORMITY COLOR
    // CREATE unconformityPatterns container for dynamic pattern creation
    d3.select('body').append('svg').attr('class', 'unconformityPatterns').attr('width', 0).attr('height', 0).attr('display', 'absolute').append('defs');

    // If user indicates an unconformity... 
    bar.append('rect').attr('class', 'unconformity-color').attr('fill', function (d, i) {
      var contact_type = d.contact.contact_type;

      if (contact_type === 'Depositional') {

        // GENERATE COLORS FOR UNCONFORMITY PATTERNS DYNAMICALLY
        var dynFill = 'transparent';

        // Prevents NaN from performing a previous operation on data index 0
        if (i > 0) {

          var lithologyClass = d.previous.lithology.classification;

          // Pass to coloring function and assign the fill to the dynFill var...
          dynFill = lithologyColoring(lithologyClass);
        }

        var patternPath = '<g transform="rotate(-180 125.319091796875,22.8419189453125)"><path fill = ' + dynFill + ' d="m35.65581,28.28433c5.93317,-4.22123 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73268,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73253,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73269,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73252,16.88482c11.86651,0 11.86651,-16.88482 23.73269,-16.88482c11.86635,0 17.79952,12.6636 23.73269,16.32332" stroke-width="2" stroke= "black" fill-rule="evenodd" fill="transparent"/></g>';

        d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-color' + i).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);

        return 'url(#unconformity-color' + i + ')';
      } else {
        return 'transparent';
      }
    }).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      return y(0) - y(parseFloat(d.thickness));
    }).attr('x', function (d) {
      return x2('Lithology');
    }).attr('stroke', 'transparent');

    // UNCONFORMITIES Textures
    // If user indicates an unconformity... 
    bar.append('rect').attr('class', 'unconformity').attr('fill', function (d, i) {
      var contact_type = d.contact.contact_type;

      if (contact_type === 'Depositional') {

        // GENERATE UNCONFORMITY PATTERNS DYNAMICALLY

        var dynFill = 'transparent';

        // Prevents NaN by preventing .previous operation from occuring
        // at data index 0
        if (i > 0) {
          dynFill = 'url(' + d.previous.lithology.url + ')';
        }

        var patternPath = '<g transform="rotate(-180 125.319091796875,22.8419189453125)"><path fill = ' + dynFill + ' d="m35.65581,28.28433c5.93317,-4.22123 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73268,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73253,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73269,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73252,16.88482c11.86651,0 11.86651,-16.88482 23.73269,-16.88482c11.86635,0 17.79952,12.6636 23.73269,16.32332" stroke-width="2" stroke= "black" fill-rule="evenodd" fill="transparent"/></g>';

        d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-' + i).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);

        return 'url(#unconformity-' + i + ')';
      } else if (contact_type === 'Tectonic') {
        return 'url(#tectonic)';
      } else if (contact_type === 'Intrusion') {
        return 'url(#intrusion)';
      } else {
        return 'transparent';
      }
    }).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      return y(0) - y(parseFloat(d.thickness));
    }).attr('x', function (d) {
      return x2('Lithology');
    }).attr('stroke', 'transparent');

    // GEOLOGIC AGE
    var x3 = x.copy();
    x3.rangeRound([0, width / 2]).domain(['Geologic Age']).padding(0.5).align(0);

    // Append bar for age 
    bar.append('rect').attr('class', 'age').attr('fill', function (d) {
      return d.timescale.color;
    }).attr('width', function (d) {
      return x3.bandwidth();
    }).attr('height', function (d) {
      return y(0) - y(parseFloat(d.thickness));
    }).attr('x', function (d) {
      return x3('Geologic Age');
    });

    // Attach Geologic Age
    bar.append("text").text(function (d) {
      return d.timescale.interval_name;
    }).attr("x", 40).attr("y", 16).style("text-anchor", "middle").style("font", "14px sans-serif");

    // x3-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x3).tickSizeOuter([0])).selectAll('.tick text');
    // x2-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x2)).selectAll('.tick text');

    // y-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10, 's')).append('text').attr('transform', 'rotate(-90)').attr('y', -45).attr('x', function () {
      return "-" + y(totalThickness / 2);
    }).attr('dy', '0.71em').text("THICKNESS (m)");

    // Tooltip D3 settings
    var tooltip = d3.select('html').append('div').attr('class', 'tool').style('background-color', 'white').style('border', '1px solid black').style('padding', '12px').style('border-radius', '8px').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden').style('font-size', '12px');
    // Tooltip action
    d3.selectAll('.bar, .bar-overlay, .unconformity').on('mouseover', function (d) {
      return tooltip.style('visibility', 'visible').html('Lithology: ' + d.name + '</br>Formation: ' + d.formation + '</br>Geologic Age: ' + d.timescale.interval_name + '</br>Upper Contact: ' + d.contact.name + '</br>Thickness (m): ' + d.thickness + '</br>Lithology Pattern: ' + (d.lithology.name3 !== "" ? d.lithology.name + ' / ' + d.lithology.name2 + ' / ' + d.lithology.name3 : d.lithology.name2 !== '' ? d.lithology.name + ' / ' + d.lithology.name2 : d.lithology.name));
    }).on('mousemove', function () {
      return tooltip.style('top', event.pageY - 120 + 'px').style('left', event.pageX + 15 + 'px');
    }).on('mouseout', function () {
      return tooltip.style('visibility', 'hidden');
    });

    // Icorporate LEGEND

    var legendRectSize = 18;
    var legendSpacing = 4;

    // AGE LEGEND

    // sorted by late_age name
    // var sortedData = data.sort(function (b, a) {
    //   return b.timescale.interval_name.localeCompare(a.timescale.interval_name);
    // });


    // // Gets rid of duplicates by grouping... 
    // var filteredData = d3.nest()
    //   .key(function (d) {
    //     return d.timescale.interval_name;
    //   })
    //   .key(function (d) {
    //     return d.timescale.color;
    //   })
    //   .entries(sortedData);


    // var legend = stratChart.selectAll('.legend-age')
    //   .data(filteredData)
    //   .enter()
    //   .append('g')
    //   .attr('class', 'legend-age')
    //   .attr('transform', function (d, i) {
    //     var lHeight = legendRectSize + legendSpacing;
    //     var horz = width + 200;
    //     var vert = i * lHeight;
    //     return 'translate(' + horz + ',' + vert + ')';
    //   });

    // legend.append('rect')
    //   .attr('width', legendRectSize)
    //   .attr('height', legendRectSize)
    //   .style('fill', function (d, i) {
    //     return d.values[0].key;
    //   })
    //   .style('stroke', 'black');

    // legend.append('text')
    //   .attr('x', (legendRectSize + legendSpacing) * -1)
    //   .attr('y', (legendRectSize - legendSpacing) - 2)
    //   .text(function (d) {
    //     return d.key;
    //   });


    // LITHOLOGY legend  

    // sorted by lithology name
    var sortedData = data.sort(function (a, b) {
      return b.lithology.name.localeCompare(a.lithology.name);
    });

    var filteredData = d3.nest().key(function (d) {
      return d.lithology.name;
    }).key(function (d) {
      return d.lithology.url;
    }).entries(sortedData);

    legendRectSize *= 1.5;
    legendSpacing *= 2;
    var legend = stratChart.selectAll('.legend-lithology').data(filteredData).enter().append('g').attr('class', 'legend-lithology').attr('transform', function (d, i) {
      var lHeight = legendRectSize + legendSpacing;
      var horz = width + 200;
      var vert = i * lHeight;
      return 'translate(' + horz + ',' + vert + ')';
    });

    // Legend Lithology Coloring
    legend.append('rect').attr('width', legendRectSize * 2).attr('height', legendRectSize).style('fill', function (d) {
      return lithologyColoring(d.values[0].values[0].lithology.classification);
    }).style('stroke', 'black:');
    // Legend Lithology Texture  
    legend.append('rect').attr('width', legendRectSize * 2).attr('height', legendRectSize).style('fill', function (d) {
      return 'url(' + d.values[0].key + ')';
    }).style('stroke', 'black:');

    legend.append('text').attr('x', legendRectSize * -1).attr('y', legendRectSize - legendSpacing - 2).text(function (d) {
      if (d.values[0].values[0].lithology.name3 != "") {
        var name = d.key + ' or ' + d.values[0].values[0].lithology.name2 + ' or ' + d.values[0].values[0].lithology.name3;
        return name;
      } else if (d.values[0].values[0].lithology.name2 != "") {
        name = d.key + ' or ' + d.values[0].values[0].lithology.name2;
        return name;
      } else {
        return d.key;
      }
    });

    return $('svg').appendTo('.stratChart');
  } // drawFunction end

  // This function returns the color of the bar
  // according to the d.lithology.classification
  function lithologyColoring(lithologyClass) {
    if (lithologyClass == 'Sandstone' || lithologyClass == 'Breccia' || lithologyClass == 'Conglomerate' || lithologyClass == 'Ironstone' || lithologyClass == 'Phosphatic') {
      return '#fbf7af';
    } else if (lithologyClass == 'Mudrock' || lithologyClass == 'Siliceous' || lithologyClass == 'Interbedded-mudrock') {
      return '#d2d3d3';
    } else if (lithologyClass == 'Carbonate' || lithologyClass == 'Evaporite') {
      return '#6caad5';
    } else if (lithologyClass == 'Igneous') {
      return '#f05a89';
    } else if (lithologyClass == 'Volcanic' || lithologyClass == 'Volcanoclastic') {
      return '#a1258e';
    } else if (lithologyClass == 'Metamorphic') {
      return '#4d25a1';
    } else if (lithologyClass == 'Other') {
      return '#ff6b6b';
    } else {
      return 'transparent';
    }
  } //lithologyColoring end


  // It broke and then i was able to pass the url
  // with just data.json. 
  // And then it broke again? \_(--)_/
  var url_id = $('.general-info').data('stratid');
  var data_url = url_id + '/data.json';
  d3.json(data_url, drawchart);
});