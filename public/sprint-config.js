$( function() {
  $("#inicioSprint" ).datepicker($.datepicker.regional[ "pt-BR" ]);
  window.springConfigForm.addEventListener('submit', function(event){
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    console.log($("#totalDias").val());
    console.log($("#inicioSprint").val());
    // return t.set('card', 'shared', 'pontuacao', pontuacao)
    // .then(function(){
    //   t.closePopup();
    // });
  });
} );