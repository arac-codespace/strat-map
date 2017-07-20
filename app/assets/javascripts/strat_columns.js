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
    let x = d3.scaleBand().rangeRound([
      0,
      width
    ]).padding(1.0);
    let domain_array = [
      'Other',
      'Sedimentary',
      'Metamorphic',
      'Igneous'
    ];
    // Wrap function provided by Mike Bostock.  The function measures the width of 
    // each band which is provided by x.bandwidth when the function is called above
    // to determine whether a line break is required or not.

    let wrap = function(text, width) {
      text.each(function() {
        let text;
        text = d3.select(this);
        let words = text.text().split(/\s+/).reverse();
        let word = undefined;
        let line = [];
        let lineNumber = 0;
        let lineHeight = 1.1;
        let y = text.attr('y');
        let dy = parseFloat(text.attr('dy'));
        let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [ word ];
            tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', (++lineNumber * lineHeight) + dy + 'em').text(word);
          }
        }
      });
    };

    x.domain(domain_array);
    // y-axis scale!    
    let y = d3.scaleLinear().range([
      height,
      0
    ]);
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
    // Append bar for color    
    bar.append('rect').attr('class', 'bar-overlay').attr('fill', function(d) {
      let spelCol = d.timescale.color;
      if (d.lithology.url === '#sed659') {
        $('.inFill').css('fill', spelCol);
      } else {
        return d.timescale.color;
      }
    }
    ).attr('width', function(d) {
      // Checks to which array the Rock Type belongs to and uses the
      // corresponding x scale.
      let found = domain_array.includes(d.lithology.rock_type);
      if (found === true) {
        return x(d.lithology.rock_type);
      }
    }
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    );
    // Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', d =>
      // Here I can just return the url stored in the lithology json object!
      `url(${d.lithology.url})`
    
    ).attr('width', function(d) {
      // Checks to which array the Rock Type belongs to and uses the
      // corresponding x scale.
      let found = domain_array.includes(d.lithology.rock_type);
      if (found === true) {
        return x(d.lithology.rock_type);
      }
    }
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    );
    // If user indicates an unconformity...  
    bar.append('rect').attr('class', 'unconformity').attr('fill', function(d) {
      let { contact_type } = d.contact;
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
    ).attr('width', d => x(d.lithology.rock_type)
    ).attr('height', d => y(0) - y(parseFloat(d.thickness))
    );
    // x-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x)).selectAll('.tick text').call(wrap, x.bandwidth());
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

    var legend = stratChart.selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var lHeight = legendRectSize + legendSpacing;
      var offset =  lHeight * data.length / 2;
      var horz = width + 80;
      var vert = i * lHeight;
      return 'translate(' + horz + ',' + vert + ')';
    });
    
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function(d){
        return d.timescale.color;
      })
      .style('stroke', "black:");    
    
    legend.append('text')
      .attr('x', (legendRectSize + legendSpacing)*-1)
      .attr('y', (legendRectSize - legendSpacing) -2)
      .text(function(d) { return d.timescale.interval_name; });    
    
    
    
    
    
    return $("svg").appendTo(".stratChart");
  };


  // It broke and then i was able to pass the url
  // with just data.json. 
  // And then it broke again? \_(--)_/
  let url_id = $('.general-info').data('stratid');
  let data_url = url_id + '/data.json';
  let stratdata = d3.json(data_url, drawchart);
}
);
