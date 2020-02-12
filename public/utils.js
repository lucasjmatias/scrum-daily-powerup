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
  return R.sum(R.values(pontuacao.done)) || 0; 
}

function contRemaining(pontuacao) {
  return parseInt(pontuacao.total) - contDone(pontuacao);
}

function contWeekendDays(begin, end) {
  var weekendDays = 0;
  if (begin.isAfter(end)){
    return weekendDays;
  }
  var beginW = begin.clone();
  while (beginW.isSameOrBefore(end)) {
    var isoWeekDay = beginW.isoWeekday();
    if (isoWeekDay === 6 || isoWeekDay === 7) {
      weekendDays++;
    }
    beginW.add(1, 'days');
  }
  return weekendDays;
}

var cleanData = R.reject(R.either(R.isEmpty, R.isNil));