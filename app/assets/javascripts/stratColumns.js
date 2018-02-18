/*global $*/
/*global d3*/
$(document).on('turbolinks:load', function () {

  // Return nothing unless the controller corresponds...
  if ($('.strat_columns.show').length !== 1) {
    return;
  }


  // Hides Collection details and toggles glyphicon class
  $("button.hide-details").on("click", function() {
    $("div.right-column").toggle();
    $("button.hide-details > i").toggleClass("glyphicon glyphicon-menu-right glyphicon glyphicon-menu-left");
  });
  
  function drawStratChart(data) {

    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };
    var width = 600 - margin.left - margin.right;
    var height = 1200 - margin.top - margin.bottom;


    // The following is to find the proportion between the smallest layer
    // and the total thickness
    var minThickness = d3.min(data, function(d) {
      return parseFloat(d.thickness);
    })

    var totalThickness = d3.sum(data, function (d) {
      return parseFloat(d.thickness);
    });    

    var minMaxProportionality = minThickness/totalThickness;

    // Finds the pixel height of the minThickness layer.
    var currentProportionality = minMaxProportionality*height;

    // If the pixel height is less than C, calculate a new height
    // that would result in the minThickness having a height of
    // C
    if (currentProportionality < 32) {
      var dynHeight = 32/minMaxProportionality;

      height = dynHeight;
    }


    // y-axis scale!    
    if (data[0].strat_column.depth == false)
    {
      var yRange = [height, 0];
    }
    else
    {
      yRange = [0, height+=64*data.length];
    }    
    
    var y = d3.scalePow().exponent(1).range(yRange);


    // var height = 80 * Math.sqrt(thickness_h) + data.length*100 - margin.top - margin.bottom;
    // if (height < 300) {
    //   height = 300 + data.length*100;
    // } else if (height > 2000)
    // {
    //   height = 2000 + data.length*100;
    // }
    
    // Scaling down columns from original dimensions...
    width*=0.9;
    // height*=0.8;

    // x-axis scale!
    var x = d3.scaleBand();

    // Selects the svg container and sets width attribute.  
    // NOTE: I'm using 1100 static to accommodate the legend to the right,
    // and account for legend's variety of name width through overflow.
    var stratChart = d3.select('.stratChart').attr('width', '1200').attr('height', height + margin.top + margin.bottom).append('g').attr('class','columnContainer');

    // For use inside the function.  This allows for the sum of successive thickness.
    var sumPrevThickness = 0;

    // Sets upper domain to the max thickness.
    y.domain([0, totalThickness]);
    // Defines the previous function to store previous thickness value up next
    for (var i = 0; i < data.length; i++) {
      data[i].previous = data[i - 1];
    }

    // Bar data bind and transformation
    var bar = stratChart.selectAll('g').data(data).enter().append('g').attr("class","gLayer").attr('transform', function (d, i) {
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
      if (data[0].strat_column.depth == false)
      {
        var transSum = y(0) - y(sumPrevThickness);
      }
      else
      {
        transSum = y(sumPrevThickness);
      }         
      // This is the value that will translate-y the bars right to the top of
      // the bar located below.  IE: Stack bars.
      return 'translate(0,' + transSum + ')';
    });

    // debugger;

    var x2 = x.copy();
    x2.rangeRound([0, width]).domain(['Lithology']).padding(0.5).align(.11);

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
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
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
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
    }).attr('x', function (d) {
      return x2('Lithology');
    });

    // UNCONFORMITY COLOR
    // CREATE unconformityPatterns container for dynamic pattern creation
    d3.select('.stratChart').append('svg').attr('class', 'unconformityPatterns').attr('width', 0).attr('height', 0).attr('display', 'absolute').append('defs');

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
          return generateUnconformity(dynFill,i,'color');
      } else {
        return 'transparent';
      }
    }).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
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

        return generateUnconformity(dynFill,i,'texture');
        
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
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
    }).attr('x', function (d) {
      return x2('Lithology');
    }).attr('stroke', 'transparent');

    // GEOLOGIC AGE
    var x3 = x.copy();
    x3.rangeRound([0, width / 2]).domain(['Geologic Age']).padding(0.75).align(0);

    // Append bar for age 
    bar.append('rect').attr('class', 'age').attr('fill', function (d) {
      return d.timescale.color;
    }).attr('width', function (d) {
      return x3.bandwidth();
    }).attr('height', function (d) {
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
    }).attr('x', function (d) {
      return x3('Geologic Age');
    });

    // HOVER RECT
    bar.append('rect').attr('class', 'hoverBar').attr('fill', 'transparent'
    ).attr('width', function (d) {
      return x2.bandwidth();
    }).attr('height', function (d) {
      if (data[0].strat_column.depth == false)
      {
        return y(0) - y(parseFloat(d.thickness));
      }
      else
      {
        return y(parseFloat(d.thickness));
      }
    }).attr('x', function(d){
      return x2('Lithology');
    });


    // FOSSIL CONTENT
    var x4 = x.copy();
    x4.rangeRound([0, width]).domain(['Fossil Content']).padding(0.30).align(1.25);

    // FOSSIL CONTENT IMG APPEND

    bar.append("g").attr("class","fossilGroup").attr("transform", function(d){
      var translateY = y(d.thickness)*.15;
      var translateX = x4("Fossil Content");

      return `translate(${translateX},${translateY})`
    })
    .each(function(d,i){
      d3.select(this).append("rect");
      d3.select(this).selectAll('image').data(d.fossils).enter().append('image').attr('class', function(d){
        // This assigment will allow me to select image container and assign the proper href
        return 'fossil-' + d.id + ' ' + 'fossil-content';
      })
      .attr('width', '32').attr('height','32')
      .attr('x',function(d,i){

        // Modulo basically allows only 7 images C wide to be side by side
        return i%10*40 

      })
      .each( function(d){

        // All right! Here I use .each which allows me to call a function for each of the 
        // d.fossils objects.

        var fossilQuery = encodeURIComponent(d.name.trim());
        var fossilClass = 'fossil-' + d.id;
        var fossilHTTP = `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;

        // Here I can access the parameters of the fetch response
        // object.  Params include ok, status, redirected etc...
        // urlExists is defined in globalFunctions

        urlExists(fossilHTTP, function(exists){
          if (exists.ok) {
            d3.select(`.${fossilClass}`).attr("xlink:href", fossilHTTP).attr("data-query-succeed", fossilQuery);
         
          } else if (!exists.ok && d.query !== null && d.query !== '') {
  
            fossilQuery = encodeURIComponent(d.query.trim());
            fossilHTTP = `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;
            urlExists(fossilHTTP, function(exists) {
              if (exists.ok){
                d3.select(`.${fossilClass}`).attr("xlink:href", fossilHTTP).attr("data-query-succeed", fossilQuery);
              } else {
                d3.select(`.${fossilClass}`).attr("xlink:href", "/assets/qmark.svg");            
              }
            })
            
          } else {
            d3.select(`.${fossilClass}`).attr("xlink:href", "/assets/qmark.svg");            
          }
        });
      });
    });
    
    
    // x3-axis line and ticks

    appendScaleAxis(stratChart, x2, height, 0);
    appendScaleAxis(stratChart, x3, height, 0);
    appendScaleAxis(stratChart, x4, height, 6);

    // y-axis line and ticks
    if (data[0].strat_column.depth == false)
    {
      var yAxisText = "HEIGHT (m)";
    }
    else
    {
      yAxisText = "DEPTH (m)";
    }

    var yAxis = stratChart.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(data.length*2)).append('text').attr('transform', 'rotate(-90)').attr('y', -60).attr('x', function () {
      return "-" + height*0.15;
    }).attr('dy', '0.71em').text(yAxisText).style('font', '12px Tahoma');

    // Tooltip D3 settings
    var tooltip = d3.select('html').append('div').attr('class', 'tool').style('background-color', 'white').style('color','black').style('border', '1px solid black').style('padding', '6px').style('border-radius', '8px').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden').style('font-size', '12px').style('font-family', 'Tahoma').style('max-width','350px');
    
    // Tooltip action for lithology
    d3.selectAll('.hoverBar').on('mouseover', function (d) {
      
      if (d.description !== "")
      {
        var description = '</br><strong>Description: </strong>' + d.description;
      } else {
        description = "";
      }
      
      return tooltip.style('visibility', 'visible').html('<strong>Name: </strong>' + d.name + '</br><strong>Formation: </strong>' + d.formation + '</br><strong>Geologic Age: </strong>' + d.timescale.interval_name + '</br><strong>Upper Contact: </strong>' + d.contact.name + '</br><strong>Thickness (m): </strong>' + d.thickness + '</br><strong>Lithology Pattern: </strong>' + (d.lithology.name3 !== "" ? d.lithology.name + ' / ' + d.lithology.name2 + ' / ' + d.lithology.name3 : d.lithology.name2 !== '' ? d.lithology.name + ' / ' + d.lithology.name2 : d.lithology.name) + description);
    }).on('mousemove', function () {

      return tooltip.style('top', d3.event.pageY - 120 + 'px').style('left', d3.event.pageX + 15 + 'px');
    }).on('mouseout', function () {
      return tooltip.style('visibility', 'hidden');
    });

    

    // FossilTooltip
    var fossilTooltip = d3.select('html').append('div').attr('class', 'tool fossil-tooltip').style('background-color', 'white').style('color','black').style('border', '1px solid black').style('padding', '6px').style('border-radius', '8px').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden').style('font-size', '12px').style('font-family', 'Tahoma').style('max-width','350px');

    // Tooltip action for fossils
    d3.selectAll('.fossil-content').on('mouseover', function (d){

      var localInfoHTML = '<strong>Name: </strong>' + d.name + '</br><strong>Abundance: </strong>' + d.abundance + '</br><strong>Notes: </strong>' + d.notes + '</br>';
      
      // The image append operation includes a part to attach data-query-succeed if it finds a 
      // matching record.  Here I use the data attribute to compose the URL where the data is.
      
      var fossilQuery = d3.select(this).attr("data-query-succeed");
 
      var fossilURL = `https://paleobiodb.org/data1.2/taxa/single.json?name=${fossilQuery}&show=full`

      // Defined in globalFunctions...
      buildPBDBHtml(fossilURL, fossilTooltip, localInfoHTML);


      return fossilTooltip.style('visibility', 'visible');
    }).on('mousemove', function() {
      return fossilTooltip.style('top', d3.event.pageY - 60 + 'px').style('left', d3.event.pageX + 15 + 'px');
    }).on('mouseout', function() {
      return fossilTooltip.style('visibility', 'hidden');
    });


    // INCORPORATE LEGEND

    // Gets rid of duplicates by grouping... 
    var ageFilteredData = d3.nest()
      .key(function (d) {
        return d.timescale.interval_name;
      })
      .key(function (d) {
        return d.timescale.color;
      })
      .entries(data);


    var lithologyFilteredData = d3.nest().key(function (d) {
      return d.lithology.name3 !== "" ? d.lithology.name + ' / ' + d.lithology.name2 + ' / ' + d.lithology.name3 : d.lithology.name2 !== '' ? d.lithology.name + ' / ' + d.lithology.name2 : d.lithology.name;
    }).key(function (d) {
      return d.lithology.url;
    }).entries(data);
    
    var unconformityFilteredData = d3.nest().key( function (d) {
      return d.contact.contact_type;
    })
    // Here we filter out data that we don't want in the legend...
    .entries(data.filter(function(d) { return d.contact.contact_type != 'Conformity'; }));
    
    var filteredData =  ageFilteredData.concat(lithologyFilteredData);
    filteredData = filteredData.concat(unconformityFilteredData);

    var legendContainer = d3.select(".stratChart").append('g').attr('class','legendContainer');
    
    condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);    


  } // drawFunction end
  
  zoomColumn();

  function appendScaleAxis(selector, scale, height, tickSize){
    selector.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + 0 + ')').call(d3.axisTop(scale).tickSizeOuter([-tickSize])).selectAll('.tick text').style('font', '12px Tahoma');
    selector.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(scale).tickSizeOuter([tickSize])).selectAll('.tick text').style('font', '12px Tahoma');
  }  

  var url_id = $('.general-info').data('stratid');
  var data_url = url_id + '/data.json';
  d3.json(data_url, drawStratChart);
});