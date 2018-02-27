/* global $*/
/* global fireAutoComplete  */
/* global getRandomInt */

// Code for html StratColumn form!
$(document).on('turbolinks:load', function() {

  if (
    !$('.strat_columns.edit').length &&
    !$('.strat_columns.new').length &&
    !$('.strat_columns.create').length &&
    !$('.strat_columns.update').length){
    return;
  }

  // defined on globalFunctions.js
  fireAutoComplete();

  // Attaches hrefs and ids for collapse functionality
  $('.add-layer').on('click', function(){

    var range = {
      min: 100,
      max: 99999
    };

    var randomNum = getRandomInt(range.min, range.max);
    var latestSection = $('.section-label>a').last();
    var latestField = $('.layerFields').last();

    latestSection.attr('href', '#' + randomNum.toString());
    latestField.attr('id', randomNum.toString());
  });

  $('.formContainer').on('cocoon:after-insert', function(){
    fireAutoComplete();
  });

});