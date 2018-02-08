/*global $*/
/*global d3*/
/*global google*/
/*global OverlappingMarkerSpiderfier*/


// This file is for JS that belongs to all indexes...

$(document).on('turbolinks:load', function () {
  
  if ($('.collections.index').length !== 1 && $('.strat_columns.index').length !== 1) {
    return;
  }


  // Hides collapse btn if height is less than specified...
  var allHideBtns = $(".hide-details");
  var allIndexDesc = $('.index-description');
  var getMaxHeight = allIndexDesc.css("max-height");
  var height;

  allIndexDesc.each(function(i){

    height = $(this).css("height");

    if (parseInt(height) < parseInt(getMaxHeight) ){

      var indexNum = $(this).data("index-description");
      var selectByAttr = $('[data-index-collapse="' + indexNum + '"]');

      selectByAttr.css("display","none");
    }

  });

  // Btn to hide index details and toggle glyphicon class
  $("button.hide-details").on("click", function() {
    var indexNum = $(this).data("index-collapse");
    var selectByAttr = $('[data-index-description="' + indexNum + '"]');
    var maxHeight = selectByAttr.css("max-height");


    if (maxHeight == "none") {
      selectByAttr.css("max-height","200px");
      $(this).find("i.glyphicon").attr("class","glyphicon glyphicon-menu-right glyphicon glyphicon-menu-down");      
    } else {
      selectByAttr.css("max-height","none");
      $(this).find("i.glyphicon").attr("class", "glyphicon glyphicon-menu-right glyphicon glyphicon-menu-up");
    }
  });    
     
  
}); // ready end