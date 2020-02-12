var BADGE_ICON = './img/ballot-check-regular.svg';

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: BADGE_ICON,
      text: 'Pontuar',
      callback: function(t) {
        return t.popup({
          title: 'Pontuação',
          url: 'pontuation.html'
        })
      }
    }];
  },
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'pontuacao')
      .then(function(pontuacao) {
        if (pontuacao) {
          var total = parseInt(pontuacao.total);
          var done = contDone(pontuacao);
          return [{
            icon: BADGE_ICON,
            text: total === done ? done : done + ' / ' + total,
            color: total === done ? 'green' : done === 0 ? 'red' : 'yellow',
          }];  
        } else {
          return [];
        }
      });
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'pontuacao')
    .then(function(pontuacao) {
      if (pontuacao) {
        var total = parseInt(pontuacao.total);
        var done = contDone(pontuacao);
        return [{
          icon: BADGE_ICON,
          text: total === done ? done : done + ' / ' + total,
          color: total === done ? 'green' : done === 0 ? 'red' : 'yellow',
          callback: function(t) {
            return t.popup({
              title: "Pontuação",
              url: 'pontuation.html',
            });
          }
        }]
      } else {
        return [];
      }
    });
  }
});