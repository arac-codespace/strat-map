/* global $*/
$(document).on("turbolinks:load", function () {

  if ($(".collections.show").length !== 1){
    return;
  }

  $(function() {
    return $('.collections-flex-container-map').sortable({
      axis: 'x',
      handle: '.handle',
      update: function() {
        return $.post($(this).data('update-url'), $(this).sortable('serialize'));
      }
    });
  });  
  
  
});