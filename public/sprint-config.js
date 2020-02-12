$( function() {
  $("#inicioSprint" ).datepicker();
  $("#totalDias").on('keydown', function(event){
      // doneInput.addEventListener('keydown', function(event) {
    let key = Number(event.key)
    if (event.which === 13) {
        event.stopPropagation();
        event.preventDefault();
    }
    if (event.which === 13 && doneInput.value) {
      addDone(doneInput.value);
    }
    if (isNaN(key) || event.key===null) {
      return false;
    }
    else {
      console.log("is numeric")
    }
  }, false);
} );