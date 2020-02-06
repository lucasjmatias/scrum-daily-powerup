var t = TrelloPowerUp.iframe();

function concatLn(first, second) {
  return first + '\n' + second;
}

function elementByClass(className) {
  return document.getElementsByClassName(className);
}

function applyToElements(elements, applyAll) {
    for (var i = 0; i < elements.length; i++) {
      applyAll(elements[i]);
    }
}
function itensDoneInput(applyAll) {
  return applyToElements(elementByClass('item-done-input'), applyAll);
}

function contDone(pontuacao) {
  return pontuacao.done.reduce(function(doneCount, done) {
    return doneCount + done.pt;
  }, 0);
}

function contRemaining(pontuacao) {
  return pontuacao.total - contDone(pontuacao);
}

var itensTotal = document.getElementsByClassName("item-total");
// var doneInput = document.getElementById("done");
var doneItensInput = document.getElementById("done-itens-input");
var donelist = document.getElementById("done-list");

var pontuacao = {
  total: 0,
  done: []
};

var clickItemTotal = function() {
  var currItem = this;
  pontuacao.total = currItem.innerText;
  pontuacao.done = [];
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
  renderDoneList();
};

function renderDoneItensInput() {
  itensDoneInput(function(item) {
    item.removeEventListener('click', addDone, false)
  });
  doneItensInput.innerHTML = "";
  if (pontuacao && pontuacao.total) {
    ponto = 1;
    var itensText = [];
    while (ponto < 10 && ponto <= contRemaining(pontuacao)) {
      itensText.push('<button class="item-done-input" type="button">' + ponto + '</button>');
      ponto++;
    }
    doneItensInput.innerHTML = itensText.reduce(concatLn, '');
    itensDoneInput(function(item) {
      item.addEventListener('click', addDone, false)
    });
  } 
}

function renderDoneList() {
  donelist.innerHTML = "";
  donelist.innerHTML = pontuacao.done.map(function(done) {
    return '<li class="item-done">' + done.pt + ' - Dia: ' + done.day + '</li>';
  }).reduce(concatLn, '');
}

function addDone() {
  pontuacao.done.push({
    pt: parseInt(this.innerText),
    day: 1
  });
  renderDoneList();
  renderDoneItensInput();
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