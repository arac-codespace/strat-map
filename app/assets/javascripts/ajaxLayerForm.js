/*global $*/

$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.show").length !== 1) {
    return;
  }
  
  console.log("huh, this is the show controller?");
  
  $('.layer-info-wrapper').on('click', '.edit-layer-btn, .new-layer-btn', function(){
    
    // Bootstrap loaded event
    $('#dialog').on('shown.bs.modal', function (e) {
      
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