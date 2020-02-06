var t = TrelloPowerUp.iframe();

var itensTotal = document.getElementsByClassName("item-total");
// var doneInput = document.getElementById("done");
var doneItens = document.getElementById("done-itens");

var pontuacao = {
  total: 0,
  done: []
};

var clickItemTotal = function() {
  var currItem = this;
  pontuacao.total = currItem.innerText;
  renderItensTotal();
}

prepareEvents();

function renderItensTotal() {
  for (var i = 0; i < itensTotal.length; i++) {
    var currItem = itensTotal[i];
    if (currItem.innerText === pontuacao.total) {
      currItem.classList.add('mod-primary');
    } else {
      currItem.classList.remove('mod-primary');
    }
    prepareDoneItens();
  }
};

function prepareDoneItens() {
  doneItens.innerHTML = "";
  if (pontuacao && pontuacao.total) {
    ponto = 1;
    var itensText = [];
    while (ponto < 10 && ponto <= pontuacao.total) {
      itensText.push('<button class="item-done" type="button">' + ponto + '</button>');
      ponto++;
    }
    doneItens.innerHTML = itensText.reduce(function(memo, valor) {
      return memo + '\n' + valor;
    }, '');
  } 
}

function addDone(done) {
  console.log(done);
}

function prepareEvents() {
  for (var i = 0; i < itensTotal.length; i++) {
    itensTotal[i].addEventListener('click', clickItemTotal, false);
  }

  // doneInput.addEventListener('keydown', function(event) {
  //   let key = Number(event.key)
  //   if (event.which === 13) {
  //       event.stopPropagation();
  //       event.preventDefault();
  //   }
  //   if (event.which === 13 && doneInput.value) {
  //     addDone(doneInput.value);
  //   }
  //   if (isNaN(key) || event.key===null) {
  //     return false;
  //   }
  //   else {
  //     console.log("is numeric")
  //   }
  // }, false);

}

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