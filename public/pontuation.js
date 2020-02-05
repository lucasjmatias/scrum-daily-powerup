var t = TrelloPowerUp.iframe();

var itensTotal = document.getElementsByClassName("item-total");

var pontuacao = {
  total: 0,
  done: []
};

var clickItemTotal = function() {
  var currItem = this;
  pontuacao.total = currItem.value;
  currItem.classList.toggle('mod-primary', currItem.value === pontuacao.total);
}

for (var i = 0; i < itensTotal.length; i++) {
  itensTotal[i].addEventListener('click', clickItemTotal, false);
}

function renderItensTotal() {
  for (var i = 0; i < itensTotal.length; i++) {
    var currItem = itensTotal[i];
    currItem.classList.toggle('mod-primary', currItem.value === pontuacao.total);
  }
};

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'pontuacao', pontuacao)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  return t.get('card', 'shared', 'pontuacao')
  .then(function(pontuacaoData){
    pontuacao = pontuacaoData || pontuacao;
  })
  .then(function(){
    t.sizeTo('#estimate').done();
  });
});