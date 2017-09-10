/* global $*/
$(document).on("turbolinks:load", function () {

  if ($(".collections.edit").length !== 1){
    return;
  }
  $("#sortable-columns").sortable();
  
  
});