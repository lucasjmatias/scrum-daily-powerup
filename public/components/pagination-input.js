function preparePaginationInputItem(active) {
  return function(item) {
    var activeClass = active === item ? 'active' : '';
    return '<li class="page-item"><a class="page-link ' + activeClass + '" href="#">' + item + '</a></li>'; 
  }
}

function calculatePaginationOffset(data, active, maxItens) {
  var sideSize = Math.floor(maxItens/2);
  var max = data.length;
  var negativeItemOffset = max - activeIndex;
  var relativeItemOffset = activeIndex - sideSize + 1;
  var canShowAll = maxItens <= max;
  var activeIndex = R.findIndex(R.equals(active))(data);
  if (canShowAll) {
    return 0;
  }
  if (negativeItemOffset <= sideSize) {
    return relativeItemOffset - negativeItemOffset; 
  }
  return relativeItemOffset;
}

function paginationInputItemSelect() {

}

function renderPaginationInput(data, container, active) {
  var maxItens = 7;
  var offset = calculatePaginationOffset(data, active, 7);
  applyToElements(container.querySelectorAll('nav>ul.pagination>li'), function(elm) {
    elm.removeEventListener('click', paginationInputItemSelect, false);
  });
  container.innerHTML = '';
  var component = "";
  component = component +  '<nav> <ul class="pagination"> <li class="page-item"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li>'
  var preparePaginationInputItemWithActive = preparePaginationInputItem(active);
  for (var i = offset; i < maxItens && i < data.length; i++) {
    component = component + preparePaginationInputItemWithActive(data[i]) + '\n';
  }
  component = component +  '<ul class="pagination"> <li class="page-item"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></nav>'
  container.innerHTML = component;
  applyToElements(container.querySelectorAll('nav>ul.pagination>li'), function(elm) {
    elm.addEventListener('click', paginationInputItemSelect, false);
  });
}

