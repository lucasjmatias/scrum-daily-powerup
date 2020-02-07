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
  return pontuacao.done.reduce(function(doneCount, done) {
    return doneCount + done.pt;
  }, 0);
}

function contRemaining(pontuacao) {
  return pontuacao.total - contDone(pontuacao);
}