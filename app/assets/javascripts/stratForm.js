/* global $*/

// Code for html StratColumn form!
$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.edit").length !== 1 && $(".strat_columns.new").length !== 1 && $(".strat_columns.create").length !== 1 && $(".strat_columns.update").length !== 1){
    return;
  }
  
  // defined on globalFunctions.js
  fireAutoComplete();

  // Attaches hrefs and ids for collapse functionality
  $(".add-layer").on('click', function(){

    var randomNum = getRandomInt(100, 99999);
    var latestSection = $(".section-label>a").last();
    var latestField = $(".layerFields").last();

    latestSection.attr("href", "#" + randomNum.toString());
    latestField.attr("id", randomNum.toString());
  });

  $(".formContainer").on('cocoon:after-insert', function(){
    fireAutoComplete();
  })

});