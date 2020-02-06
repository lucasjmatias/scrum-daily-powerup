var t = TrelloPowerUp.iframe();

var itensTotal = document.getElementsByClassName("item-total");
// var doneInput = document.getElementById("done");
var doneItensInput = document.getElementById("done-itens-input");

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
    renderDoneItensInput();
  }
};

function itensDoneInput(applyAll) {
  var itens = document.getElementsByClassName("item-done-input");
  for (var i = 0; i < itens.length; i++) {
    applyAll(itens[i]);
  }
}

function renderDoneItensInput() {
  itensDoneInput(function(item) {
    item.removeEventListener('click', addDone, false)
  });
  doneItensInput.innerHTML = "";
  if (pontuacao && pontuacao.total) {
    ponto = 1;
    var itensText = [];
    while (ponto < 10 && ponto <= pontuacao.total) {
      itensText.push('<button class="item-done-input" type="button">' + ponto + '</button>');
      ponto++;
    }
    doneItensInput.innerHTML = itensText.reduce(function(memo, valor) {
      return memo + '\n' + valor;
    }, '');
    itensDoneInput().addEventListener('click', addDone, false);
  itensDoneInput(function(item) {
    item.addEventListener('click', addDone, false)
  });
  } 
}

function addDone(done) {
  pontuacao.done.push({
    pt: done,
    day: 1
  });
  console.log(pontuacao.done);
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