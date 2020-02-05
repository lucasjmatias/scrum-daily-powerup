var t = TrelloPowerUp.iframe();

var itensTotal = document.getElementsByClassName("item-total");

var pontuacao = {
  total: 0,
  done: []
};

var clickItemTotal = function() {
  var currItem = this;
  pontuacao.total = currItem.value;
  renderItensTotal();
}

for (var i = 0; i < itensTotal.length; i++) {
  itensTotal[i].addEventListener('click', clickItemTotal, false);
}

function renderItensTotal() {
  for (var i = 0; i < itensTotal.length; i++) {
    var currItem = itensTotal[i];
    if (currItem.value === pontuacao.total) {
      currItem.classList.add('mod-primary');
    } else {
      currItem.classList.remove('mod-primary');
    }
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
    renderItensTotal();
  })
  .then(function(){
    t.sizeTo('#estimate').done();
  });
});