var t = TrelloPowerUp.iframe();

function itensDoneInputApply(applyAll) {
  return applyToElements(elementsByClass('item-done-input'), applyAll);
}
function itensDoneDelete(applyAll) {
  return applyToElements(elementsBySelector('.item-done > i.fa-trash'), applyAll);
}

function itensDoneAdd(applyAll) {
  return applyToElements(elementsBySelector('.item-done > i.fa-plus-circle'), applyAll);
}

function itensDoneRemove(applyAll) {
  return applyToElements(elementsBySelector('.item-done > i.fa-minus-circle'), applyAll);
}

var itensTotal = elementsByClass('item-total');
// var doneInput = document.getElementById("done");
var doneContainer = elementById('done-container');
var doneItensInput = elementById('done-itens-input');
var donelist = elementById('done-list');
var itemTotalEdit = elementById('item-total-edit');
var showDone = elementById('show-done');
var sprintDays = elementById('sprint-days');

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
    renderPaginationInput([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], sprintDays, 9);
    itensDoneInputApply(function(item) {
      item.addEventListener('click', function(){addDone(parseInt(this.innerText), parseInt(sprintSelect.value))}, false)
    });
  } 
}

function renderDoneList() {
  showDone.innerText = '(' + contDone(pontuacao) + ')';
  donelist.innerHTML = "";
  donelist.innerHTML = pontuacao.done.map(function(done) {
    return '<li class="item-done">' + done.pt + ' - Dia: ' + done.day + ' <i class="fas fa-plus-circle"></i><i class="fas fa-minus-circle"></i><i class="fas fa-trash"></i></li>';
  }).reduce(concatLn, '');
  itensDoneDelete(function(item) {
      item.addEventListener('click', deleteItemDone, false)
  });
  itensDoneAdd(function(item) {
      item.addEventListener('click', addItemDone, false)
  });
  itensDoneRemove(function(item) {
      item.addEventListener('click', removeItemDone, false)
  })
}

function addDone(points, day) {
  pontuacao.done.push({
    pt: points,
    day: day
  });
  renderDoneList();
  renderDoneItensInput();
}

function deleteItemDone() {
  
}

function addItemDone() {
  
}

function removeItemDone() {
  
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