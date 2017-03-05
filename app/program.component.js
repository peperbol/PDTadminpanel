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
        ng.material.MdSnackBar,
        function(ApiService,MdSnackBar) {
          this.api = ApiService;
          this.snackBar = MdSnackBar;
        }

      ],
      saveProgram:function(){
        var me = this;
        this.api.updateProgram(this.data.objectId, app.Data.copyProgram(this.data)).then(function(){
          me.cache = JSON.stringify(this.data);
          me.snackBar.open("Saved","", {
            duration: 1500,
          });
        })



      },
      newYear(){
        this.data.years.push(app.Data.newYear(this.data.years.length+1));
      },
      isDirty(){
        if(!this.cache)
          this.cache = JSON.stringify(this.data);

        return this.cache == JSON.stringify(this.data);
      }

    });
})(window.app || (window.app = {}));
