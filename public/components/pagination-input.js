function preparePaginationInputItem(item, active) {
  var activeClass = active === item ? 'active' : '';
  return '<li class="page-item value-item ' + activeClass + '"><a class="page-link" href="#">' + item + '</a></li>'; 
}

function calculatePaginationOffset(data, active, maxItens) {
  var sideSize = Math.floor(maxItens/2);
  var activeIndex = paginationInputActiveIndex(data, active);
  var max = data.length;
  var isLeft = activeIndex < sideSize;
  if (isLeft) {
    return 0;
  }
  var isRight = max - activeIndex <= sideSize;
  if (isRight) {
    return max - maxItens; 
  }
  return activeIndex - sideSize;
}

function paginationInputActiveIndex(data, active) {
  return R.findIndex(R.equals(active))(data);
}

function paginationInputIsFirst(data, active) {
  var activeIndex = paginationInputActiveIndex(data, active);
  return activeIndex <= 0;
} 

function paginationInputIsLast(data, active) {
  var activeIndex = paginationInputActiveIndex(data, active);
  return activeIndex + 1 >= data.length; 
} 

function paginationInputItemSelect(data, container, active) {
  paginationInputGoTo(data, container, active)
}

function paginationInputGoToIndex(data, container, activeIndex) {
  renderPaginationInput(data, container, data[activeIndex]);
}

function paginationInputGoTo(data, container, nextActive) {
  renderPaginationInput(data, container, nextActive);
}

function paginationInputPreviousPage(data, container, active) {
  if (paginationInputIsFirst(data, active)) {
    return;
  }
  var activeIndex = paginationInputActiveIndex(data, active);
  paginationInputGoToIndex(data, container, activeIndex - 1);
}

function paginationInputNextPage(data, container, active) {
  if (paginationInputIsLast(data, active)) {
    return;
  }
  var activeIndex = paginationInputActiveIndex(data, active);
  paginationInputGoToIndex(data, container, activeIndex + 1);
}

function paginationInputItemSelectEvent(data, container, active) {
  return function() {
    return paginationInputItemSelect(data, container, this.innerText);
  }
}

function paginationInputPreviousPageEvent(data, container, active) {
  return function() {
    return paginationInputPreviousPage(data, container, active);
  }
}

function paginationInputNextPageEvent(data, container, active) {
  return function() {
    return paginationInputNextPage(data, container, active);
  }
}

var paginationInputItemSelectEventWithData;
var paginationInputNextPageEventWithData;
var paginationInputPreviousPageEventWithData;

function renderPaginationInput(data, container, active) {
  var maxItens = 7;
  var offset = calculatePaginationOffset(data, active, maxItens);
  applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
    elm.removeEventListener('click', paginationInputItemSelectEventWithData, false);
  });
  applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
    elm.removeEventListener('click',paginationInputPreviousPageEventWithData, false);
  });
  applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
    elm.removeEventListener('click',paginationInputNextPageEventWithData, false);
  });

  paginationInputItemSelectEventWithData =  paginationInputItemSelectEvent(data, container, active);
  paginationInputNextPageEventWithData =  paginationInputNextPageEvent(data, container, active);
  paginationInputPreviousPageEventWithData =  paginationInputPreviousPageEvent(data, container, active);

  container.innerHTML = '';
  var component = "";
  component = component +  '<nav> <ul class="pagination"> <li class="page-item ' + (paginationInputIsFirst(data, active) ? 'disabled' : '') + '"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li>'
  for (var i = offset; i < (maxItens + offset) && i < data.length; i++) {
    component = component + preparePaginationInputItem(data[i], active) + '\n';
  }
  component = component +  '<li class="page-item ' + (paginationInputIsLast(data, active) ? 'disabled' : '') + '"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>'
  container.innerHTML = component;
  applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
    elm.addEventListener('click', paginationInputItemSelectEventWithData, false);
  });
  applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
    elm.addEventListener('click',paginationInputPreviousPageEventWithData, false);
  });
  applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
    elm.addEventListener('click',paginationInputNextPageEventWithData, false);
  });
}

