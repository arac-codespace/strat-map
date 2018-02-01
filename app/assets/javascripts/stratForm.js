/* global $*/

$(document).on("turbolinks:load", function () {

  if ($(".strat_columns.edit").length !== 1 && $(".strat_columns.new").length !== 1 && $(".strat_columns.create").length !== 1 && $(".strat_columns.update").length !== 1){
    return;
  }
  
  fireAutoComplete();

  // Attaches hrefs and ids for collapse functionality
  $(".add-layer").on('click', function(){

    var randomNum = getRandomInt(100, 99999);
    var latestSection = $(".section-label>a").last();
    var latestField = $(".layerFields").last();

    latestSection.attr("href", "#" + randomNum.toString());
    latestField.attr("id", randomNum.toString());

    $(".formContainer").on('cocoon:after-insert', function(){
      fireAutoComplete();
    })
  });


  //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }  

  function fireAutoComplete() {
    // Initial binding of autocomplete...
    $('.timescale_name').autocomplete({
      // Note that in html, autocomplete_source is converted to autocomplete-source
      source: $('.timescale_name').data('autocomplete-source')
    });
    
    $('.lithology_name').autocomplete({
      source: $('.lithology_name').data('autocomplete-source')
    });
  }

});