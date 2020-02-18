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

var prepareHolidays = R.map(function(holiday) {return moment(holiday, 'DD/MM/YYYY')});

var isHoliday = function(dateRef){
  return function(holiday) {
    return dateRef.isSame(holiday, 'day');
  }
};

function contWeekendDays(begin, end, holidays) {
  var preparedHolidays = prepareHolidays(holidays);
  var weekendDays = 0;
  if (begin.isAfter(end)){
    return weekendDays;
  }
  var currentDay = begin.clone();
  while (currentDay.isSameOrBefore(end)) {
    var isoWeekDay = currentDay.isoWeekday();
    if (isoWeekDay === 6 || isoWeekDay === 7 || R.any(isHoliday(currentDay), preparedHolidays)) {
      weekendDays++;
    }
    currentDay.add(1, 'days');
  }
  return weekendDays;
}

function contSprintDays(sprintTotalDays, begin, holidays) {
  var today = moment();
  var yesterday = today.subtract(1, 'days');
  var beginDt = moment(begin, 'DD/MM/YYYY', true);
  var dayFromBegin = yesterday.diff(beginDt, 'days') + 1 - contWeekendDays(beginDt, yesterday, holidays);
  return R.min(dayFromBegin, sprintTotalDays);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var cleanData = R.reject(R.either(R.isEmpty, R.isNil));