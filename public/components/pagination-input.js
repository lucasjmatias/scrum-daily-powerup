function preparePaginationInputItem(item, active) {
  var activeClass = active === item ? 'active' : '';
  return '<li class="page-item value-item ' + activeClass + '"><a class="page-link" href="#">' + item + '</a></li>'; 
}

function calculatePaginationOffset(data, active, maxItens) {
  var sideSize = Math.floor(maxItens/2);
  var activeIndex = paginationInputActiveIndex(data, active);
  var max = data.length;
  var negativeItemOffset = max - activeIndex;
  var relativeItemOffset = activeIndex - sideSize + 1;
  var canShowAll = max <= maxItens;
  if (canShowAll || activeIndex < sideSize) {
    return 0;
  }
  if (negativeItemOffset <= sideSize) {
    return relativeItemOffset - negativeItemOffset; 
  }
  return relativeItemOffset;
}

function paginationInputActiveIndex(data, active) {
  return R.findIndex(R.equals(active))(data);
}

function paginationInputIsFirst(data, active) {
  var activeIndex = paginationInputActiveIndex(data, active);
  if (activeIndex <= 0 ) {
    return;
  }
} 

function paginationInputIsLast(data, active) {
  var activeIndex = paginationInputActiveIndex(data, active);
  return activeIndex >= data.length; 
} 

function paginationInputItemSelect() {
}

function paginationInputPreviousPage(data, container, active) {
  if (paginationInputIsFirst(data, active)) {
    return;
  }
  var activeIndex = paginationInputActiveIndex(data, active);
  renderPaginationInput(data, container, data[activeIndex - 1])
}

function paginationInputNextPage(data, container, active) {
  if (paginationInputIsLast(data, active)) {
    return;
  }
  var activeIndex = paginationInputActiveIndex(data, active);
  renderPaginationInput(data, container, data[activeIndex - 1])
}

function renderPaginationInput(data, container, active) {
  var maxItens = 7;
  var offset = calculatePaginationOffset(data, active, maxItens);
  applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
    elm.removeEventListener('click', function() {paginationInputItemSelect(data, container, active);}, false);
  });
  applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
    elm.removeEventListener('click',function() {paginationInputPreviousPage(data, container, active);}, false);
  });
  applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
    elm.removeEventListener('click',function() {paginationInputNextPage(data, container, active);}, false);
  });
  container.innerHTML = '';
  var component = "";
  component = component +  '<nav> <ul class="pagination"> <li class="page-item ' + paginationInputIsFirst(data, active) ? 'disabled' : '' + '"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li>'
  for (var i = offset; i < (maxItens + offset) && i < data.length; i++) {
    component = component + preparePaginationInputItem(data[i], active) + '\n';
  }
  component = component +  '<li class="page-item ' + paginationInputIsLast(data, active) ? 'disabled' : '' + '"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>'
  container.innerHTML = component;
  applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
    elm.addEventListener('click', function() {paginationInputItemSelect(data, container, active);}, false);
  });
  applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
    elm.addEventListener('click',function() {paginationInputPreviousPage(data, container, active);}, false);
  });
  applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
    elm.addEventListener('click',function() {paginationInputNextPage(data, container, active);}, false);
  });
}

