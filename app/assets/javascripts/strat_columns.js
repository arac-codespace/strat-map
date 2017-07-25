/*global $*/ 
/*global d3*/ 

$(document).on("turbolinks:load", function() {
  // Return nothing unless the controller corresponds...
  if ($(".strat_columns.show").length !== 1) { return; }

  let drawchart = function(data) {
    let thickness_h = d3.sum(data, d => parseFloat(d.thickness)
    );
    let object_num = data.length;

    let margin = { 
      top: 40,
      right: 50,
      bottom: 125,
      left: 60
    };
    let width = 600 - (margin.left) - (margin.right);
    let height = (100 * Math.sqrt(thickness_h)) - (margin.top) - (margin.bottom);
    //500
    // x-axis scale!
    let x = d3.scaleBand();
    // let domain_array = ['Geologic Age'];
    
    // x.domain(domain_array);
    // y-axis scale!    
    let y = d3.scaleLinear().range([height,0]);
    

    // Selects the svg container and sets width attribute.  
    // NOTE: I'm using 100% to allow the svg to occupy the container's
    // full width.  For a more static approach you can use
    // width + margin.left + margin.right which in the current settings
    // will compute to 600px.  This is also the dimensions the x-scale
    // is based on.
    let stratChart = d3.select('.stratChart').attr('width', "100%");
    // Sets the height for the svg/chart container.
    stratChart.attr('height', height + margin.top + margin.bottom);
    // .append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");;    
    // For use inside the function.  This allows for the sum of successive thickness.
    let sumPrevThickness = 0;
    // Just sums the thickness of all the datasets in the JSON.
    let totalThickness = d3.sum(data, d => parseFloat(d.thickness)
    );
    // Sets upper domain to the max thickness.
    y.domain([
      0,
      totalThickness
    ]
    );
    // Defines the previous function to store previous thickness value up next
    let i = 0;
    while (i < data.length) {
      data[i].previous = data[i - 1];
      i++;
    }
    // Bar data bind and transformation
    let bar = stratChart.selectAll('g').data(data).enter().append('g').attr('transform', function(d, i) {
      // Note that i refers to the number of objects!
      // Empty var to store previous thickness
      let prevThickness = undefined;
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
      let transSum = y(0) - y(sumPrevThickness);
      // This is the value that will translate-y the bars right to the top of
      // the bar located below.  IE: Stack bars.
      return `translate(0,${transSum})`;
    }
    );
    
    var x2 = x.copy();
    x2.rangeRound([0, width]).domain(["Lithology"]).padding(0.5).align(0.25);
    
    // LITHOLOGY Color!
    // x2 = x.copy();
    // x2.rangeRound([0, width]).domain(["Lithology"]).padding(0.5).align(0.25);
    // Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', function(d)
    {
      var lithologyClass = d.lithology.classification;
      if ($(".interbedded-carbonate").length >= 1)
      {
        $(".interbedded-carbonate").attr("fill","rgb(108, 170, 213)");
      }
      if (lithologyClass == "Sandstone" || lithologyClass == "Breccia" || lithologyClass == "Conglomerate" || lithologyClass == "Ironstone" || lithologyClass == "Phosphatic")
      {
        return "#fbf7af";
      }
      else if (lithologyClass == "Mudrock" || lithologyClass == "Siliceous" || (lithologyClass == "Interbedded-mudrock"))
      {
        return "rgb(210, 211, 211)";
      }
      else if (lithologyClass == "Carbonate" || lithologyClass == "Evaporite")
      {
        return "rgb(108, 170, 213)";
      }
      else if (lithologyClass == "Igneous")
      {
        return "rgb(240, 90, 137)";
      }
      else if (lithologyClass == "Volcanic" || lithologyClass == "Volcanoclastic")
      {
        return "rgb(161, 37, 142)";
      }
      else if (lithologyClass == "Metamorphic")
      {
        return "#4d25a1";
      }
      else if (lithologyClass== "Other")
      {
        return "#ff6b6b";
      }
      else
      {
        return "white";
      }
    }
    
    ).attr('width', function(d) {
        return x2.bandwidth();
    }
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    ).attr("x", function(d){
      return x2("Lithology");
    }
    );    
    
    // LITHOLOGY
    // Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', function(d){
      // Here I can just return the url stored in the lithology json object!
      var patternSelect = d.lithology.url;
      
      // To prevent the pattern scaling operation from being done more than once...
      if (!$(patternSelect + "> g").hasClass(patternSelect))
      {
        var patternWidth = $(patternSelect).attr("width");
        var patternHeight = $(patternSelect).attr("height");
        
        $(patternSelect + '> g').addClass(patternSelect);
        $(patternSelect + '> g').attr("transform", "scale(4)");
        $(patternSelect).attr("width", patternWidth*4);
        $(patternSelect).attr("height", patternHeight*4);
        $(patternSelect).attr("x", "15");
        $(patternSelect).attr("y", "20");
      }
        return `url(${patternSelect})`;
    }
    ).attr('width', function(d) {
        return x2.bandwidth();
    }
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    ).attr("x", function(d){
      return x2("Lithology");
    }
    );
    
  
    // UNCONFORMITIES
    
    // The following is a unconformity texture modification that offsets
    // it from center top of bar
    // $("#unconformity").attr("y","-16");
    
    // If user indicates an unconformity... 
    bar.append('rect').attr('class', 'unconformity').attr('fill', function(d) {
      var { contact_type } = d.contact;
      if (contact_type === 'Depositional') {
        return 'url(#unconformity)';
      } else if (contact_type === 'Tectonic') {
        return 'url(#tectonic)';
      } else if (contact_type === 'Intrusion') {
        return 'url(#intrusion)';
      } else {
        return 'None';
      }
    }  
    ).attr('width', function(d)
    { 
      return x2.bandwidth();
    }
      
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    ).attr("x", function(d)
    {
      return x2("Lithology");
    }
    ).attr("y","-16").attr("stroke","none");
    
    
    
    
    
    
    
    
    
    // GEOLOGIC AGE
    var x3 = x.copy();
    x3.rangeRound([0,width/2]).domain(["Geologic Age"]).padding(0.5).align(0);
    
    // Append bar for age 
    bar.append('rect').attr('class', 'bar').attr('fill', function(d){
      return d.timescale.color;
    }
    
    ).attr('width', function(d) {
        return x3.bandwidth();
    }
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    ).attr("x", function(d){
      return x3("Geologic Age");
    }
    );  
    
    
    // x3-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x3).tickSizeOuter([0])).selectAll('.tick text');
    // x2-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x2)).selectAll('.tick text');
    
    // y-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10, 's')).append('text').attr('transform', 'rotate(-90)').attr('y', -45).attr('x', '-15%').attr('dy', '0.71em').text('THICKNESS (m)');
    
    // Tooltip D3 settings
    let tooltip = d3.select('html').append('div').attr('class', 'tool').style('background-color', 'white').style('border', '1px solid black').style('padding', '12px').style('border-radius', '8px').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden').style('font-size', '12px');
    // Tooltip action
    d3.selectAll('.bar, .bar-overlay, .unconformity').on('mouseover', d =>
      tooltip.style('visibility', 'visible').html(`Lithology: ${d.name}</br>Formation: ${d.formation}</br>Geologic Age: ${d.timescale.interval_name}</br>Upper Contact: ${d.contact.name}</br>Thickness (m): ${d.thickness}</br>Lithology Pattern: ` +
      
      (d.lithology.name3 !== "" ? 
        d.lithology.name + ' / ' + d.lithology.name2 + ' / ' + d.lithology.name3
      : d.lithology.name2 !== "" ?
        (d.lithology.name + ' / ' +  d.lithology.name2)
      :
        d.lithology.name)
      )
    
        
    ).on('mousemove', () => tooltip.style('top', (event.pageY - 120) + 'px').style('left', event.pageX + 15 + 'px')
    ).on('mouseout', () => tooltip.style('visibility', 'hidden')
    );
    
    
    // Icorporate LEGEND
    
    var legendRectSize = 18;
    var legendSpacing = 4;
    
    
    
    // AGE LEGEND
    
    // sorted by late_age name
    var sortedData = data.sort(function(b,a){
      return b.timescale.interval_name.localeCompare(a.timescale.interval_name);
    });  
    
    
    // Gets rid of duplicates by grouping... 
    var filteredData = d3.nest()
        .key(function(d) { return d.timescale.interval_name; })
        .key(function(d) { return d.timescale.color; })
        .entries(sortedData);    
    
    
    var legend = stratChart.selectAll('.legend-age')
    .data(filteredData)
    .enter()
    .append('g')
    .attr('class', 'legend-age')
    .attr('transform', function(d, i) {
      var lHeight = legendRectSize + legendSpacing;
      var horz = width + 200;
      var vert = i * lHeight;
      return 'translate(' + horz + ',' + vert + ')';
    });
    
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function(d,i){
        return d.values[0].key;
      })
      .style('stroke', "black:");    
    
    legend.append('text')
      .attr('x', (legendRectSize + legendSpacing)*-1)
      .attr('y', (legendRectSize - legendSpacing) -2)
      .text(function(d) {
        return d.key;
      }); 
      
      
    
    // LITHOLOGY legend  
    
    // sorted by lithology name
    sortedData = data.sort(function(a,b){
      return b.lithology.name.localeCompare(a.lithology.name);
    });  
    
    filteredData = d3.nest()
      .key(function(d) { return d.lithology.name; })
      .key(function(d) { return d.lithology.url; })
      .entries(sortedData);      
    
    legendRectSize *=1.5;
    legendSpacing *=2;
    legend = stratChart.selectAll('.legend-lithology')
    .data(filteredData)
    .enter()
    .append('g')
    .attr('class', 'legend-lithology')
    .attr('transform', function(d, i) {
      var lHeight = legendRectSize + legendSpacing;
      var horz = width + 200;
      var vert = -i * lHeight + height -80;
      return 'translate(' + horz + ',' + vert + ')';
    });      
      
    legend.append('rect')
      .attr('width', legendRectSize*2)
      .attr('height', legendRectSize)
      .style('fill', function(d){
        return `url(${d.values[0].key})`;
      })
      .style('stroke', "black:");    
    
    legend.append('text')
      .attr('x', (legendRectSize)*-1)
      .attr('y', (legendRectSize - legendSpacing) -2)
      .text(function(d) { return d.key; });    
    

    return $("svg").appendTo(".stratChart");
  };


  // It broke and then i was able to pass the url
  // with just data.json. 
  // And then it broke again? \_(--)_/
  let url_id = $('.general-info').data('stratid');
  let data_url = url_id + '/data.json';
  d3.json(data_url, drawchart);
}
);
