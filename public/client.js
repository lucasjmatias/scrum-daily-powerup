var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
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
        return [{
          icon: pontuacao ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
          text: pontuacao ? pontuacao.total : 'No Estimate!',
          color: pontuacao ? null : 'red',
        }];  
      });
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'pontuacao')
    .then(function(pontuacao) {
      return [{
        title: 'Estimate',
        text: pontuacao ? pontuacao.total : 'No Estimate!',
        color: pontuacao ? null : 'red',
        callback: function(t) {
          return t.popup({
            title: "Pontuação",
            url: 'pontuation.html',
          });
        }
      }]
    });
  }
});