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

function contDone(pontuacao) {
  return R.sum(R.keys(pontuacao.done)) || 0; 
}

function contRemaining(pontuacao) {
  return parseInt(pontuacao.total) - contDone(pontuacao);
}