/*global $*/

$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.show").length !== 1) {
    return;
  }
  
  $('.layer-info-wrapper').on('click', '.edit-layer-btn, .new-layer-btn', function(){
    // Bootstrap loaded event
    $('#dialog').on('shown.bs.modal', function (e) {
      fireAutoComplete();
      $(".simple_form").on('cocoon:after-insert', function(){
        fireAutoComplete();
      })
    });   
  });

  
})