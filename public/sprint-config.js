var t = TrelloPowerUp.iframe();

var sprint = {
  dias: 0,
  inicio: moment()
}

t.render(function(){
  return t.get('board', 'shared', 'sprint')
  .then(function(sprintData){
    sprint = sprintData || sprint;
    elementById("totalDias").value = sprint.dias;
    elementById("inicioSprint").value = sprint.inicio.format('DD/MM/YYYY');
  })
  .then(function(){
    t.sizeTo('#springConfigForm').done();
  });
});

$( function() {
  $("#inicioSprint").datepicker($.datepicker.regional[ "pt-BR" ]);
  $("#springConfigForm").on('submit', function(event){
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    var dateTxt = $("#inicioSprint").val(); 
    var dias = parseInt($("#totalDias").val()); 
    var mDate =  moment(dateTxt, "DD/MM/YYYY", true);
    if (mDate.isValid() && R.is(Number, dias) && !isNaN(dias)) {
      sprint.dias = dias;
      sprint.inicio = mDate;
      return t.set('board', 'shared', 'sprint', sprint)
          .then(function(){
            t.closePopup();
          });
    }
  });
} );
