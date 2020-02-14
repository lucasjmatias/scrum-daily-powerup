var t = TrelloPowerUp.iframe();

var sprint = {
  dias: 0,
  inicio: moment().format('DD/MM/YYYY')
}

t.render(function(){
  return t.get('board', 'shared', 'sprint')
  .then(function(sprintData){
    sprint = sprintData || sprint;
    elementById("totalDias").value = sprint.dias;
    elementById("inicioSprint").value = sprint.inicio;
  })
  .then(function(){
    // t.sizeTo('#springConfigForm').done();
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
      sprint.inicio = dateTxt;
      var ax = axios.default;
      return ax.get('/feriados', {params: {ano: mDate.format('YYYY')}})
           .then(function(response) {
              sprint.feriados = response.data;
              return t.set('board', 'shared', 'sprint', sprint)
                  .then(function(){
                    t.closePopup();
                  });
           });
    }
  });
} );
