/* global $*/

$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.edit").length !== 1 && $(".strat_columns.new").length !== 1 && $(".strat_columns.create").length !== 1 && $(".strat_columns.update").length !== 1){
    console.log("no controller action for form.js");
    return;
  }
  
  // Initial binding of autocomplete...
  $('.timescale_name').autocomplete({
    // Note that in html, autocomplete_source is converted to autocomplete-source
    source: $('.timescale_name').data('autocomplete-source')
  });
  
  $('.lithology_name').autocomplete({
    source: $('.lithology_name').data('autocomplete-source')
  });

  console.log("form js loading?");

  // var cloneIndex = $(".layer-fields_0").length;
  var layerNum = $('.layer').length;
  var removeBtn = '<span class = \'btn btn-xs btn-default remove_btn\'><i class=\'glyphicon glyphicon-minus\'></i> Remove section </span>';
  // collapseAnchor = '<a data-toggle="collapse" href="#form-collapse' + indexNum + '"> <b>Stratum #' + indexNum+1 +'</b> </a>'
  //to check for current number of fields. 
  //Critical for edit form.
  var clone = function clone() {
    // https://stackoverflow.com/questions/10308621/jquery-change-clone-inputs-to-empty
    // Here we actually modify the cloned object and not the current object
    var source = $('.layer-fields_0');
    var cloned = source.clone();
    cloned.find('input,textarea,select').val('');
    // Clears values
    cloned.val('').appendTo('#layer-container').attr('class', "panel panel-default xtra-layer layer-fields_" + layerNum).attr('data-index', layerNum).find('*').each(function () {
      var fieldName = $(this).attr('data-fieldname');
      var idOrLabel = "strat_column_layers_attributes_" + layerNum + "_" + fieldName;
      var name = "strat_column[layers_attributes][" + layerNum + "][" + fieldName + "]";
      // For label fields
      $(this).find('label').attr({ for: idOrLabel });
      // For select fields
      $(this).find('select').attr({
        id: idOrLabel,
        name: name
      });
      // For input fields
      $(this).find('input').attr({
        id: idOrLabel,
        name: name
      });
      // For textarea
      $(this).find('textarea').attr({
        id: idOrLabel,
        name: name
      });
      var headerName = "section-label_" + layerNum;
      // if the object has a section-label class...
      if ($(this).attr('class') === 'section-label section-label_0') {
        // For Section header
        $(this).text('');
        // change the object's class to section-label_index
        $(this).attr('class', headerName);
        // Append collapse anchor
        var collapseAnchor = "<a data-toggle=\"collapse\" href=\"#form-collapse" + layerNum + "\"> <b>New Stratum" + "</b> </a>";
        $(this).append(collapseAnchor);

        // Add data attribute to remove btn
        removeBtn = "<span class = 'btn btn-xs btn-default remove_btn' data-removeindex=" + layerNum + "><i class='glyphicon glyphicon-minus'></i> Remove section </span>";
        // Select that section-label_index and append html
        $(this).append(removeBtn);
      }

      var collapseId = "form-collapse" + layerNum;
      if ($(this).attr('id') === 'form-collapse0') {
        $(this).attr('id', collapseId);
      }

      // Remove tooltip...
      if ($(this).hasClass('tooltips')) {
        $(this).remove();
      }
    });
    layerNum++;
  };

  if (layerNum > 1) {
    var lastChildren = $('.layer').slice(-layerNum + 1);
    lastChildren.each(function () {
      var removeBtn;
      var dataIndex = $(this).attr('data-index');
      removeBtn = "<span class = 'btn btn-xs btn-default remove_btn' data-removeindex=" + dataIndex + "><i class='glyphicon glyphicon-minus'></i> Remove section </span>";
      $(this).find('.section-label').append(removeBtn);
      $(this).find('.panel-collapse').removeClass("in");
    });
  }
  // cloneIndex = layerNum;
  $('.footer').on('click', '.add_btn', function(){
    clone();
    
    // This will bind the data to the new text field when adding a new
    // form
    $('.timescale_name:last').autocomplete({
      source: $('.timescale_name').data('autocomplete-source')
    });    
    
    $('.lithology_name:last').autocomplete({
      source: $('.lithology_name').data('autocomplete-source')
    });    
    
  });
  // NOTE: Event handlers are bound only to the currently selected elements; 
  // they must exist at the time your code makes the call to .on()
  // http://api.jquery.com/on/
  $('#layer-container').on('click', '.remove_btn', function () {
    var dataIndexRemove = $(this).attr('data-removeindex');
    // var toSearch = data-index=
    $('html').find("[data-index=\"" + dataIndexRemove + "\"]").find('.checkbox > input.delete_member').val('true').appendTo('#layer-container');
    $('html').find("[data-index=\"" + dataIndexRemove + "\"]").remove();
  });
});