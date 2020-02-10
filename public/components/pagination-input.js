function PaginationInput(data, container, active) {
  return renderPaginationInput(container, active);
   
  function preparePaginationInputItem(item, active) {
    var activeClass = active === item ? 'active' : '';
    return '<li class="page-item value-item ' + activeClass + '"><a class="page-link" href="#">' + item + '</a></li>'; 
  }

  function calculatePaginationOffset(active, maxItens) {
    var sideSize = Math.floor(maxItens/2);
    var activeIndex = paginationInputActiveIndex(active);
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

  function paginationInputActiveIndex(active) {
    return R.findIndex(R.equals(active))(data);
  }

  function paginationInputIsFirst(active) {
    var activeIndex = paginationInputActiveIndex(active);
    return activeIndex <= 0;
  } 

  function paginationInputIsLast(active) {
    var activeIndex = paginationInputActiveIndex(active);
    return activeIndex + 1 >= data.length; 
  } 

  function paginationInputItemSelect(container, active) {
    paginationInputGoTo(container, active)
  }

  function paginationInputGoToIndex(container, activeIndex) {
    renderPaginationInput(container, data[activeIndex]);
  }

  function paginationInputGoTo(container, nextActive) {
    renderPaginationInput(container, nextActive);
  }

  function paginationInputPreviousPage(container, active) {
    if (paginationInputIsFirst(active)) {
      return;
    }
    var activeIndex = paginationInputActiveIndex(active);
    paginationInputGoToIndex(container, activeIndex - 1);
  }

  function paginationInputNextPage(container, active) {
    if (paginationInputIsLast(active)) {
      return;
    }
    var activeIndex = paginationInputActiveIndex(active);
    paginationInputGoToIndex(container, activeIndex + 1);
  }

  function paginationInputItemSelectEvent(container, active) {
    return function() {
      return paginationInputItemSelect(container, this.innerText);
    }
  }

  function paginationInputPreviousPageEvent(container, active) {
    return function() {
      return paginationInputPreviousPage(container, active);
    }
  }

  function paginationInputNextPageEvent(container, active) {
    return function() {
      return paginationInputNextPage(container, active);
    }
  }

  var paginationInputItemSelectEventWithData;
  var paginationInputNextPageEventWithData;
  var paginationInputPreviousPageEventWithData;

  function renderPaginationInput(container, active) {
    var maxItens = 5;
    var offset = calculatePaginationOffset(active, maxItens);
    applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
      elm.removeEventListener('click', paginationInputItemSelectEventWithData, false);
    });
    applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
      elm.removeEventListener('click',paginationInputPreviousPageEventWithData, false);
    });
    applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
      elm.removeEventListener('click',paginationInputNextPageEventWithData, false);
    });

    paginationInputItemSelectEventWithData =  paginationInputItemSelectEvent(container, active);
    paginationInputNextPageEventWithData =  paginationInputNextPageEvent(container, active);
    paginationInputPreviousPageEventWithData =  paginationInputPreviousPageEvent(container, active);

    container.innerHTML = '';
    var component = "";
    component = component +  '<nav> <ul class="pagination"> <li class="page-item ' + (paginationInputIsFirst(active) ? 'disabled' : '') + '"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li>'
    for (var i = offset; i < (maxItens + offset) && i < data.length; i++) {
      component = component + preparePaginationInputItem(data[i], active) + '\n';
    }
    component = component +  '<li class="page-item ' + (paginationInputIsLast(active) ? 'disabled' : '') + '"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>'
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
};