function PaginationInput(data, container, active) {
  return renderPaginationInput(active);
   
  function preparePaginationInputItem(item, active) {
    console.log("active, item:", active, item);
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

  function paginationInputItemSelect(active) {
    paginationInputGoTo(active)
  }

  function paginationInputGoToIndex(activeIndex) {
    renderPaginationInput(data[activeIndex]);
  }

  function paginationInputGoTo(nextActive) {
    renderPaginationInput(nextActive);
  }

  function paginationInputPreviousPage(active) {
    if (paginationInputIsFirst(active)) {
      return;
    }
    var activeIndex = paginationInputActiveIndex(active);
    paginationInputGoToIndex(activeIndex - 1);
  }

  function paginationInputNextPage(active) {
    if (paginationInputIsLast(active)) {
      return;
    }
    var activeIndex = paginationInputActiveIndex(active);
    paginationInputGoToIndex(activeIndex + 1);
  }

  function paginationInputItemSelectEvent(active) {
    return function() {
      return paginationInputItemSelect(parseInt(this.innerText));
    }
  }

  function paginationInputPreviousPageEvent(active) {
    return function() {
      return paginationInputPreviousPage(active);
    }
  }

  function paginationInputNextPageEvent(active) {
    return function() {
      return paginationInputNextPage(active);
    }
  }

  var paginationInputItemSelectEventWithData;
  var paginationInputNextPageEventWithData;
  var paginationInputPreviousPageEventWithData;

  function renderPaginationInput(active) {
    console.log("active:" + active);
    var maxItens = 5;
    var offset = calculatePaginationOffset(active, maxItens);

    console.log("active:" + offset);
    applyToElements(container.querySelectorAll('.page-item.value-item'), function(elm) {
      elm.removeEventListener('click', paginationInputItemSelectEventWithData, false);
    });
    applyToElements(container.querySelectorAll('.page-item:first-child'), function(elm) {
      elm.removeEventListener('click',paginationInputPreviousPageEventWithData, false);
    });
    applyToElements(container.querySelectorAll('.page-item:last-child'), function(elm) {
      elm.removeEventListener('click',paginationInputNextPageEventWithData, false);
    });

    paginationInputItemSelectEventWithData =  paginationInputItemSelectEvent(active);
    paginationInputNextPageEventWithData =  paginationInputNextPageEvent(active);
    paginationInputPreviousPageEventWithData =  paginationInputPreviousPageEvent(active);

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