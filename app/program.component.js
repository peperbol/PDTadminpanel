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
        ng.core.Renderer,
        ng.core.NgZone,
        function(ApiService,MdSnackBar,renderer, ngZone) {
          var me= this;
          this.api = ApiService;
          this.snackBar = MdSnackBar;
          this.pageScroll = 0;
          renderer.listenGlobal('window', 'scroll', function(e){ngZone.run(function(){me.onScroll(e)})});
        }

      ],
      onScroll(event){
        this.pageScroll = event.currentTarget.scrollY;
      },
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
              duration: 3000,
            });
          }
        })
      },
      removeRequisites(id){
        removeFrom = function(arr){
          var i;
          while((i= arr.indexOf(id))>=0){
            arr.splice(i,1);
          }
        }

        this.data.years.forEach(function(year){year.courses.forEach(function(course){
          removeFrom(course.prerequisites);
          removeFrom(course.equalrequisites);
        })});
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
      },
      newId(){
        var ids = this.data.years
         .reduce(function(arr,val){return arr.concat(val.courses)},[])
         .map(function(e){return e.id});
        var newId;
        do {
          newId = Math.floor(Math.random()*1000000);
        } while (ids.includes(newId))
        return newId;
      },
      getCoursesOfYear(i){
        return this.data.years[i-1].courses;
      }
    });
})(window.app || (window.app = {}));
