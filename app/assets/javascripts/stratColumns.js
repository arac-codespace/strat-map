/* global $ */
/* global d3 */
/* global lithologyColoring */
/* global generateUnconformity */
/* global urlExists */
/* global buildPBDBHtml*/
/* global condensedLegend */
/* global zoomColumn */

$(document).on('turbolinks:load', function() {

  // Return nothing unless the controller corresponds...
  if (!$('.strat_columns.show').length) {
    return;
  }

  // Hides Collection details and toggles glyphicon class
  $('button.hide-details').on('click', function() {
    $('div.right-column').toggle();
    $('button.hide-details > i').toggleClass(
      'glyphicon glyphicon-menu-right glyphicon glyphicon-menu-left');
  });

  function drawStratChart(data) {

    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    };

    var DIMENSIONX = 600;
    var DIMENSIONY = 1200;
    var width = DIMENSIONX - margin.left - margin.right;
    var height = DIMENSIONY - margin.top - margin.bottom;


    // Prev height calc
    // var height = 80 * Math.sqrt(thickness_h) + data.length*100
    // height -= - margin.top - margin.bottom;
    // if (height < 300) {
    //   height = 300 + data.length*100;
    // } else if (height > 2000)
    // {
    //   height = 2000 + data.length*100;
    // }

    // The following is to find the proportion between the smallest layer
    // and the total thickness
    var minThickness = d3.min(data, function(d) {
      return parseFloat(d.thickness);
    });

    var totalThickness = d3.sum(data, function(d) {
      return parseFloat(d.thickness);
    });

    // MINLAYERHEIGHT:Height == minThickness:totalThickness
    var minMaxProportionality = minThickness/totalThickness;

    // Finds the pixel height when height = DIMENSIONY...
    var currentMinHeight = minMaxProportionality*height;


    // If the currentMinHeight is less than MINLAYERHEIGHT, calculate a new
    // height that would result in the minThickness having a height of
    // MINLAYERHEIGHT
    let MINLAYERHEIGHT = 32;
    let dynHeight = MINLAYERHEIGHT/minMaxProportionality;
    let firstLayerIndex = 0;

    // Sets height
    if (currentMinHeight < MINLAYERHEIGHT) {
      height = dynHeight;
    }

    // Determines y-axis orientation and range by checking for depth
    let findColumnDepth = data[firstLayerIndex].strat_column.depth;
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

    // Selects the svg container and sets width attribute.
    // NOTE: I'm using 1200 static to accommodate the legend to the right,
    // and account for legend's variety of name width through overflow.
    let stratChart = d3.select('.stratChart').attr('width', '1200')
    .attr('height', height + margin.top + margin.bottom)
    .append('g').attr('class','columnContainer');

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
    let bar = stratChart.selectAll('g').data(data).enter()
    .append('g').attr('class','gLayer')
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


    let x2 = x.copy();
    let X2PADDING = 0.5;
    let X2ALIGN = 0.11;
    x2.rangeRound([RANGEBOUNDARY, width])
    .domain(['Lithology']).padding(X2PADDING).align(X2ALIGN);

    // LITHOLOGY Color!
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
    bar.append('rect').attr('class', 'bar').attr('fill', function(d) {
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

    // UNCONFORMITY COLOR
    // CREATE unconformityPatterns container for dynamic pattern creation
    let NODIMENSIONS = 0;
    d3.select('.stratChart').append('svg')
    .attr('class', 'unconformityPatterns')
    .attr('width', NODIMENSIONS).attr('height', NODIMENSIONS)
    .attr('display', 'absolute').append('defs');

    // If user indicates an unconformity...
    bar.append('rect').attr('class', 'unconformity-color')
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
          return generateUnconformity(dynFill,i,'color');
      } else {
        return 'transparent';
      }
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
    }).attr('stroke', 'transparent');

    // UNCONFORMITIES Textures
    // If user indicates an unconformity...
    bar.append('rect').attr('class', 'unconformity')
    .attr('fill', function(d, i) {
      var contact_type = d.contact.contact_type;

      if (contact_type === 'Depositional') {

        // GENERATE UNCONFORMITY PATTERNS DYNAMICALLY
        let dynFill = 'transparent';

        // Prevents NaN by preventing .previous operation from occuring
        // at data index 0
        let INDEXZERO;
        if (i > INDEXZERO) {
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
    }).attr('stroke', 'transparent');

    // GEOLOGIC AGE
    let x3 = x.copy();
    let BYHALF = 2;
    let X3PADDING = 0.75;
    let X3ALIGN = 0;
    x3.rangeRound([RANGEBOUNDARY, width / BYHALF])
    .domain(['Geologic Age']).padding(X3PADDING).align(X3ALIGN);

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
      return x3('Geologic Age');
    });

    // HOVER RECT
    bar.append('rect').attr('class', 'hoverBar').attr('fill', 'transparent'
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


    // FOSSIL CONTENT
    let x4 = x.copy();
    let X4PADDING = 0.30;
    let X4ALIGN = 1.25;
    x4.rangeRound([RANGEBOUNDARY, width])
    .domain(['Fossil Content']).padding(X4PADDING).align(X4ALIGN);

    // FOSSIL CONTENT IMG APPEND
    bar.append('g').attr('class','fossilGroup')
    .each(function(d){
      d3.select(this).append('rect');
      d3.select(this).selectAll('image')
      .data(d.fossils).enter().append('image')
      .attr('class', function(d){
        // This assigment allows to select the
        // image container and assign the proper href
        return `fossil-${d.id} fossil-content`;
      })
      .attr('width', '32').attr('height','32')
      .attr('x',function(d,i){

        let spacing = x4('Fossil Content');
        // Modulo basically allows only x imgsInRow
        // if x imgWidth wide to be side by side

        let imgsInRow = 10;
        let imgWidth = 40;
        return spacing + i%imgsInRow*imgWidth;
      })
      .each( function(d){

        // All right! Here I use .each which allows
        // me to call a function for each of the
        // d.fossils objects.

        var fossilQuery = encodeURIComponent(d.name.trim());
        var fossilClass = 'fossil-' + d.id;
        var fossilHTTP =
        `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;

        // Here I can access the parameters of the fetch response
        // object.  Params include ok, status, redirected etc...
        // urlExists is defined in globalFunctions

        urlExists(fossilHTTP, function(exists){
          if (exists.ok) {

            d3.select(`.${fossilClass}`)
            .attr('xlink:href', fossilHTTP)
            .attr('data-query-succeed', fossilQuery);

          } else if (!exists.ok && d.query !== null && d.query !== '') {

            fossilQuery = encodeURIComponent(d.query.trim());
            fossilHTTP =
            `https://paleobiodb.org/data1.2/taxa/thumb.png?name=${fossilQuery}`;

            urlExists(fossilHTTP, function(exists) {
              if (exists.ok){
                d3.select(`.${fossilClass}`)
                .attr('xlink:href', fossilHTTP)
                .attr('data-query-succeed', fossilQuery);
              } else {
                d3.select(`.${fossilClass}`)
                .attr('xlink:href', '/assets/qmark.svg');
              }
            });

          } else {
            d3.select(`.${fossilClass}`)
            .attr('xlink:href', '/assets/qmark.svg');
          }
        });
      });
    });

    // x3-axis line and ticks
    let TICKSIZE = 0;
    appendScaleAxis(stratChart, x2, height, TICKSIZE);
    appendScaleAxis(stratChart, x3, height, TICKSIZE);
    appendScaleAxis(stratChart, x4, height, TICKSIZE);

    // y-axis line and ticks
    let yAxisText;
    if (findColumnDepth == false) {
      yAxisText = 'HEIGHT (m)';
    } else {
      yAxisText = 'DEPTH (m)';
    }

    let TICKFREQUENCY = 2;
    let YPOSITION = -60;
    stratChart.append('g').attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(data.length*TICKFREQUENCY))
    .append('text').attr('transform', 'rotate(-90)')
    .attr('y', YPOSITION).attr('x', function() {
      let PERCENOFTHEIGHT = 0.15;
      return `-${height*PERCENOFTHEIGHT}`;
    }).attr('dy', '0.71em').text(yAxisText).style('font', '12px Tahoma');

    // Tooltip D3 settings
    let tooltip = d3.select('html').append('div')
    .attr('class', 'tool').style('background-color', 'white')
    .style('color','black').style('border', '1px solid black')
    .style('padding', '6px').style('border-radius', '8px')
    .style('position', 'absolute').style('z-index', '10')
    .style('visibility', 'hidden').style('font-size', '12px')
    .style('font-family', 'Tahoma').style('max-width','350px');

    // Tooltip action for lithology
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
      let XTOOLPOSITION = 15;
      return tooltip.style('top', d3.event.pageY - YTOOLPOSITION + 'px')
                    .style('left', d3.event.pageX + XTOOLPOSITION + 'px');
    }).on('mouseout', function() {
      return tooltip.style('visibility', 'hidden');
    });

    // FossilTooltip
    let fossilTooltip = d3.select('html')
    .append('div').attr('class', 'tool fossil-tooltip')
    .style('background-color', 'white').style('color','black')
    .style('border', '1px solid black').style('padding', '6px')
    .style('border-radius', '8px').style('position', 'absolute')
    .style('z-index', '10').style('visibility', 'hidden')
    .style('font-size', '12px').style('font-family', 'Tahoma')
    .style('max-width','350px');

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


    // INCORPORATE LEGEND
    // Gets rid of duplicates by grouping...
    let ageFilteredData = d3.nest()
      .key(function(d) {
        return d.timescale.interval_name;
      })
      .key(function(d) {
        return d.timescale.color;
      })
      .entries(data);


    let lithologyFilteredData = d3.nest().key(function(d) {

      let legendLabels;
      if (d.lithology.name3 !== '') {
        legendLabels =
        `${d.lithology.name} / ${d.lithology.name2} / ${d.lithology.name3}`;
      } else if (d.lithology.name2) {
        legendLabels =
        `${d.lithology.name} / ${d.lithology.name2}`;
      } else {
        legendLabels =
        `${d.lithology.name}`;
      }

      return legendLabels;

    }).key(function(d) {
      return d.lithology.url;
    }).entries(data);

    let unconformityFilteredData = d3.nest().key( function(d) {
      return d.contact.contact_type;
    })
    // Here we filter out data that we don't want in the legend...
    .entries(data.filter(function(d) {
      return d.contact.contact_type != 'Conformity';
    }));

    let filteredData =  ageFilteredData.concat(lithologyFilteredData);
    filteredData = filteredData.concat(unconformityFilteredData);

    let legendContainer = d3.select('.stratChart')
    .append('g').attr('class','legendContainer');

    condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);
  } // drawFunction end

  zoomColumn();

  function appendScaleAxis(selector, scale, height, tickSize){
    // Append top and bottom x scales
    let XTRANSLATETOP = 0;
    let YTRANSLATETOP = 0;

    selector.append('g').attr('class', 'axis axis--x')
    .attr('transform', `translate(${XTRANSLATETOP},${YTRANSLATETOP})`)
    .call(d3.axisTop(scale).tickSizeOuter([-tickSize]))
    .selectAll('.tick text').style('font', '12px Tahoma');

    let XTRANSLATEBOTTOM=0;
    let YTRANSLATEBOTTOM= height;

    selector.append('g').attr('class', 'axis axis--x')
    .attr('transform', `translate(${XTRANSLATEBOTTOM},${YTRANSLATEBOTTOM})`)
    .call(d3.axisBottom(scale).tickSizeOuter([tickSize]))
    .selectAll('.tick text').style('font', '12px Tahoma');
  }

  let url_id = $('.general-info').data('stratid');
  let data_url = url_id + '/data.json';
  d3.json(data_url, drawStratChart);
});