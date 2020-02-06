var t = TrelloPowerUp.iframe();

function concatLn(first, second) {
  return first + '\n' + second;
}

function elementsBySelector(query) {
  return document.querySelectorAll(query);
}

function elementById(id) {
  return document.getElementById(id);
}

function elementsByClass(className) {
  return document.getElementsByClassName(className);
}

function applyToElements(elements, applyAll) {
    for (var i = 0; i < elements.length; i++) {
      applyAll(elements[i]);
    }
}
function itensDoneInputApply(applyAll) {
  return applyToElements(elementsByClass('item-done-input'), applyAll);
}
function itensDoneDelete(applyAll) {
  return applyToElements(elementsBySelector('.item-done > i.fa-trash'), applyAll);
}

function contDone(pontuacao) {
  return pontuacao.done.reduce(function(doneCount, done) {
    return doneCount + done.pt;
  }, 0);
}

function contRemaining(pontuacao) {
  return pontuacao.total - contDone(pontuacao);
}

var itensTotal = elementsByClass('item-total');
// var doneInput = document.getElementById("done");
var doneContainer = elementById('done-container');
var doneItensInput = elementById('done-itens-input');
var donelist = elementById('done-list');
var itemTotalEdit = elementById('item-total-edit');
var showDone = elementById('show-done');

var pontuacao = {
  total: 0,
  done: []
};

var edicaoTotal = true;

var clickItemTotal = function() {
  var currItem = this;
  pontuacao.total = currItem.innerText;
  pontuacao.done = [];
  edicaoTotal = false;
  renderItensTotal();
}

prepareEvents();

function renderItensTotal() {
  for (var i = 0; i < itensTotal.length; i++) {
    var currItem = itensTotal[i];
    if (currItem.innerText === pontuacao.total) {
      currItem.classList.add('mod-primary');
      currItem.classList.remove('invisible');
    } else {
      if (!edicaoTotal) {
        currItem.classList.add('invisible');
      } else {
        currItem.classList.remove('invisible');
      }
      currItem.classList.remove('mod-primary');
    }
    if (!edicaoTotal) {
      itemTotalEdit.classList.remove('invisible')
    } else {
      itemTotalEdit.classList.add('invisible')
    }
    renderDoneItensInput();
  }
  renderDoneList();
  
};

function renderDoneItensInput() {
  itensDoneInputApply(function(item) {
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
    itensDoneInputApply(function(item) {
      item.addEventListener('click', addDone, false)
    });
  } 
}

function renderDoneList() {
  showDone.innerText = '(' + contDone(pontuacao) + ')';
  donelist.innerHTML = "";
  donelist.innerHTML = pontuacao.done.map(function(done) {
    return '<li class="item-done">' + done.pt + ' - Dia: ' + done.day + ' <i class="fas fa-trash"></i></li>';
  }).reduce(concatLn, '');
  itensDoneDelete(function(item) {
      item.addEventListener('click', deleteItemDone, false)
  });
}

function addDone() {
  pontuacao.done.push({
    pt: parseInt(this.innerText),
    day: 1
  });
  renderDoneList();
  renderDoneItensInput();
}

function deleteItemDone() {
  
}

function toggleEditTotal() {
  edicaoTotal = !edicaoTotal;
  renderItensTotal();  
}

function prepareEvents() {
  for (var i = 0; i < itensTotal.length; i++) {
    itensTotal[i].addEventListener('click', clickItemTotal, false);
  }

  itemTotalEdit.addEventListener('click', toggleEditTotal, false);

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
    if (pontuacao && pontuacao.total) {
      edicaoTotal = false;
    }
    renderItensTotal();
  })
  .then(function(){
    t.sizeTo('#estimate').done();
  });
});