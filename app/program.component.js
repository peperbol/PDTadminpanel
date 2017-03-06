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
        this.api.updateProgram(this.data.objectId, app.Data.copyProgram(this.data)).then(function(success){
          if(success){
            me.setCache();
            me.snackBar.open("Saved","", {
              duration: 1500,
            });
          } else{
            me.snackBar.open("Failed to Save","", {
              duration: 1500,
            });
          }
        })
      },
      newYear: function(){
        this.data.years.forEach(function(y){y.courses.forEach(function(c){c.graduationyear = false;})})
        this.data.years.push(app.Data.newYear(this.data.years.length+1));
      },
      setCache: function(){
        var cache = JSON.stringify(app.Data.copyProgram(this.data));
        this.cache = cache;
      },
      isDirty: function(){
        if(!this.cache)
          this.setCache();

        var cache = JSON.stringify(app.Data.copyProgram(this.data));

        return this.cache != cache;
      },
      deleteYearAt: function(i){

        this.data.years.slice(i).forEach(function(e){e.order --;});
        this.data.years.splice(i,1);
      }

    });
})(window.app || (window.app = {}));
