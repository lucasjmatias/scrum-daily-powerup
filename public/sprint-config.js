$( function() {
  $("#inicioSprint" ).datepicker($.datepicker.regional[ "pt-BR" ]);
  $("#totalDias").on('keydown', function(event){
      // doneInput.addEventListener('keydown', function(event) {
    let key = Number(event.key)
    if (event.which === 13) {
        event.stopPropagation();
        event.preventDefault();
    }
    if (isNaN(key) || event.key===null) {
      console.log('not numeric');
      return false;
    }
    else {
      console.log("is numeric")
    }
  }, false);
} );