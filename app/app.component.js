(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      templateUrl: 'views/main.html'
    })
    .Class({
      constructor: [
        app.ApiService,
        function(ApiService) {
          var me = this;
          this.api = ApiService;
          this.data = {};
          this.api.getData().then(function(d){ me.data  = d});
        }
      ],
      stringify: function(object){
        return JSON.stringify(object);
      }
    });
})(window.app || (window.app = {}));
