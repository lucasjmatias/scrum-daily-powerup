$( function() {
  $("#inicioSprint").datepicker($.datepicker.regional[ "pt-BR" ]);
  $("#springConfigForm").on('submit', function(event){
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    var dateTxt = $("#inicioSprint").val(); 
    var dias = parseInt($("#totalDias").val()); 
    var mDate =  moment(dateTxt, "DD/MM/YYYY", true);
    if (mDate.isValid() && R.is(Number, dias) && !isNaN(dias)) {
      var sprint = {
        dias: dias,
        inicio: mDate
      };
      return t.set('board', 'shared', 'sprint', sprint)
          .then(function(){
            t.closePopup();
          });
    }
  });
} );