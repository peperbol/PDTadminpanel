(function(app) {
  app.ProgramComponent =
    ng.core.Component({
      selector: '.program',
      templateUrl: 'views/program.html',
      inputs: ["data"]
    })
    .Class({
      constructor: [
        app.ApiService,
        function(ApiService) {
          this.api = ApiService
        }
      ],
      saveProgram:function(){
        this.api.updateProgram(this.data.objectId, app.Data.copyProgram(this.data))
      }

    });
})(window.app || (window.app = {}));
