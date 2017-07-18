$(document).on "turbolinks:load", ->
  # Return nothing unless the controller corresponds...
  return unless $(".strat_columns.show").length == 1

  drawchart = (data) ->
    thickness_h = d3.sum(data, (d) ->
      parseFloat d.thickness
    )
    object_num = data.length
    # alert(object_num);
    margin = 
      top: 40
      right: 50
      bottom: 125
      left: 60
    width = 600 - (margin.left) - (margin.right)
    height = 100 * Math.sqrt(thickness_h) - (margin.top) - (margin.bottom)
    #500
    # x-axis scale!
    x = d3.scaleBand().rangeRound([
      0
      width
    ]).padding(1.0)
    domain_array = [
      'Other'
      'Sedimentary'
      'Metamorphic'
      'Igneous'
    ]
    # Wrap function provided by Mike Bostock.  The function measures the width of 
    # each band which is provided by x.bandwidth when the function is called above
    # to determine whether a line break is required or not.

    wrap = (text, width) ->
      text.each ->
        `var text`
        text = d3.select(this)
        words = text.text().split(/\s+/).reverse()
        word = undefined
        line = []
        lineNumber = 0
        lineHeight = 1.1
        y = text.attr('y')
        dy = parseFloat(text.attr('dy'))
        tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em')
        while word = words.pop()
          line.push word
          tspan.text line.join(' ')
          if tspan.node().getComputedTextLength() > width
            line.pop()
            tspan.text line.join(' ')
            line = [ word ]
            tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
        return
      return

    x.domain domain_array
    # y-axis scale!    
    y = d3.scaleLinear().range([
      height
      0
    ])
    # Selects the svg container and sets width attribute.  
    stratChart = d3.select('.stratChart').attr('width', width + margin.left + margin.right)
    # Sets the height for the svg/chart container.
    stratChart.attr 'height', height + margin.top + margin.bottom
    # .append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");;    
    # For use inside the function.  This allows for the sum of successive thickness.
    sumPrevThickness = 0
    # Just sums the thickness of all the datasets in the JSON.
    totalThickness = d3.sum(data, (d) ->
      parseFloat d.thickness
    )
    # Sets upper domain to the max thickness.
    y.domain [
      0
      totalThickness
    ]
    # Defines the previous function to store previous thickness value up next
    i = 0
    while i < data.length
      data[i].previous = data[i - 1]
      i++
    # Bar data bind and transformation
    bar = stratChart.selectAll('g').data(data).enter().append('g').attr('transform', (d, i) ->
      # Note that i refers to the number of objects!
      # Empty var to store previous thickness
      prevThickness = undefined
      # To avoid NaN error, make the var 0 when the index is greater than 0
      # ie.  No previous index exist before index 0/ first data array
      if i > 0
        prevThickness = parseFloat(d.previous.thickness)
      else
        prevThickness = 0
      # Var defined outside of function allows for the addition of the 
      # prevThickness value due to how the function loop works.
      sumPrevThickness += prevThickness
      transSum = y(0) - y(sumPrevThickness)
      # This is the value that will translate-y the bars right to the top of
      # the bar located below.  IE: Stack bars.
      'translate(0,' + transSum + ')'
    )
    # Append bar for color    
    bar.append('rect').attr('class', 'bar-overlay').attr('fill', (d) ->
      spelCol = d.timescale.color
      if d.lithology.url == '#sed659'
        $('.inFill').css 'fill', spelCol
      else
        return d.timescale.color
      return
    ).attr('width', (d) ->
      # Checks to which array the Rock Type belongs to and uses the
      # corresponding x scale.
      found = domain_array.includes(d.lithology.rock_type)
      if found == true
        return x(d.lithology.rock_type)
      return
    ).attr 'height', (d) ->
      y(0) - y(parseFloat(d.thickness))
    # Append bar for texture 
    bar.append('rect').attr('class', 'bar').attr('fill', (d) ->
      # Here I can just return the url stored in the lithology json object!
      'url(' + d.lithology.url + ')'
    ).attr('width', (d) ->
      # Checks to which array the Rock Type belongs to and uses the
      # corresponding x scale.
      found = domain_array.includes(d.lithology.rock_type)
      if found == true
        return x(d.lithology.rock_type)
      return
    ).attr 'height', (d) ->
      y(0) - y(parseFloat(d.thickness))
    # If user indicates an unconformity...  
    bar.append('rect').attr('class', 'unconformity').attr('fill', (d) ->
      contact_type = d.contact.contact_type
      if contact_type == 'Depositional'
        'url(#unconformity)'
      else if contact_type == 'Tectonic'
        'url(#tectonic)'
      else if contact_type == 'Intrusion'
        'url(#intrusion)'
      else
        'None'
    ).attr('width', (d) ->
      x d.lithology.rock_type
    ).attr 'height', (d) ->
      y(0) - y(parseFloat(d.thickness))
    # x-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x)).selectAll('.tick text').call wrap, x.bandwidth()
    # y-axis line and ticks
    d3.select('.stratChart').append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10, 's')).append('text').attr('transform', 'rotate(-90)').attr('y', -45).attr('x', '-15%').attr('dy', '0.71em').text 'THICKNESS (m)'
    # Tooltip D3 settings
    tooltip = d3.select('html').append('div').attr('class', 'tool').style('background-color', 'white').style('border', '1px solid black').style('padding', '12px').style('border-radius', '8px').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden').style('font-size', '12px')
    # Tooltip action
    d3.selectAll('.bar, .bar-overlay, .unconformity').on('mouseover', (d) ->
      tooltip.style('visibility', 'visible').html 'Name: ' + d.name + '</br>' + 'Formation: ' + d.formation + '</br>' + 'Period: ' + d.timescale.interval_name + '</br>' + 'Epoch or Age: ' + d.epoch_age + '</br>' + 'Lithology: ' + d.lithology.name + '</br>' + 'Geologic Contact: ' + d.contact.name + '</br>' + 'Thickness: ' + d.thickness
    ).on('mousemove', ->
      tooltip.style('top', event.pageY - 10 + 'px').style 'left', event.pageX + 10 + 'px'
    ).on 'mouseout', ->
      tooltip.style 'visibility', 'hidden'
    return

  # It broke and then i was able to pass the url
  # with just data.json. 
  # And then it broke again? \_(--)_/
  url_id = $('.general-info').data('stratid')
  data_url = url_id + '/data.json'
  stratdata = d3.json(data_url, drawchart)
  return

# ---
# generated by js2coffee 2.2.0