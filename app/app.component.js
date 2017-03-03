(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      templateUrl: 'views/main.html'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
