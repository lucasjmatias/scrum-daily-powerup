function preparePaginationInputItem(item, active) {
  var activeClass = active === item ? 'active' : '';
  return '<li class="page-item ' + activeClass + '"><a class="page-link" href="#">' + item + '</a></li>'; 
}

function calculatePaginationOffset(data, active, maxItens) {
  var sideSize = Math.floor(maxItens/2);
  var activeIndex = R.findIndex(R.equals(active))(data);
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
  for (var i = offset; i < (maxItens + offset) && i < data.length; i++) {
    component = component + preparePaginationInputItem(data[i], active) + '\n';
  }
  component = component +  '<li class="page-item"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>'
  container.innerHTML = component;
  applyToElements(container.querySelectorAll('nav>ul.pagination>li'), function(elm) {
    elm.addEventListener('click', paginationInputItemSelect, false);
  });
}

