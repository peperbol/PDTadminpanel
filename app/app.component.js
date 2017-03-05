(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'body',
      templateUrl: 'views/main.html'
    })
    .Class({
      constructor: [
        app.ApiService,
        function(ApiService) {
          var me = this;
          this.api = ApiService;
          this.data = [];
          this.loadData();
        }
      ],
      loadData: function(){
        var me = this;
        this.api.getAllPrograms().then(function(d){ me.data  = d});
      },
      stringify: function(object){
        return JSON.stringify(object);
      }
    });
})(window.app || (window.app = {}));
