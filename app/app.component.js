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
        this.api.getAllPrograms().then(function(d){ me.data  = d.sort(function(a,b){return (a.program + a.graduationprogram).localeCompare(b.program + b.graduationprogram);});});
      },
      stringify: function(object){
        return JSON.stringify(object);
      }
    });
})(window.app || (window.app = {}));
