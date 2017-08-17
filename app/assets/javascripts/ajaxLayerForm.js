/*global $*/

$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.show").length !== 1) {
    console.log("no controller action for ajaxLayerForm.js detected");
    return;
  }
  
  console.log("huh, this is the show controller?");
  
  $('.layer-info-wrapper').on('click', '.edit-layer-btn, .new-layer-btn', function(){
    
    console.log("inside click event");
    
    // Bootstrap loaded event
    $('#dialog').on('shown.bs.modal', function (e) {
      
      console.log("inside loaded event");
      
      // Initial binding of autocomplete...
      $('.timescale_name').autocomplete({
        // Note that in html, autocomplete_source is converted to autocomplete-source
        source: $('.timescale_name').data('autocomplete-source')
      });
      
      $('.lithology_name').autocomplete({
        source: $('.lithology_name').data('autocomplete-source')
      });
    });
    
  });

  
})