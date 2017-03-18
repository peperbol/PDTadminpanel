(function(app) {
  app.CourseComponent =
    ng.core.Component({
      selector: '.course',
      templateUrl: 'views/course.html',
      inputs: ["data", "order", "first", "last", "lastYear", "program", "yearOrder"],
      outputs:["moveUp","moveDown", "delete"]
    })
    .Class({
      constructor: [
        app.ClipboardService,
        function(clipboard) {
        var me = this;
          this.endperiode = 1;
          this.startperiode = 0;
          this.searchEqualRequisites = "";
          this.searchPreRequisites = "";
          this.open = false;
          this.moveUp = new ng.core.EventEmitter();
          this.moveDown = new ng.core.EventEmitter();
          this.delete = new ng.core.EventEmitter();
          this.clipboard = clipboard;
      }],
      ngOnInit: function(){

          this.startperiode= this.data.start-1;
          this.endperiode= 5- (this.data.start+this.data.duration);
      },
      changeEnd: function(e){
        var me = this;
        if(e){
          me.endperiode = 4 - Math.max(1,4-e);
          me.startperiode =   Math.min(me.startperiode,(4-me.endperiode)-1);
        }
        me.data.start = me.startperiode + 1;
        me.data.duration =  (4-me.endperiode) - me.startperiode;
        if(me.endperiode != e){

          new Promise(function(){
            setTimeout(function(){
              me.endperiode = 4 - Math.max(1,4-e);
            },1000)
          });
        }
      },
      changeStart: function(e){
        var me = this;
        if(e){
          me.startperiode =   Math.min(e,3);
          me.endperiode = 4 - Math.max(me.startperiode+1,4-me.endperiode);
        }
        me.data.start = me.startperiode + 1;
        me.data.duration =  (4-me.endperiode) - me.startperiode;


        if(me.startperiode != e){
          console.log("wee");
          new Promise(function(){
            setTimeout(function(){
              return 1;
            },1000)
          }).then(function(){
            me.startperiode =   Math.min(e,3);
            console.log("hi");
        });
        }
      },
      moveUpF: function(){
        this.moveUp.emit(this.order);
      },
      moveDownF: function(){
        this.moveDown.emit(this.order);
      },
      deleteF: function(){
        this.program.removeRequisites(this.data.id)
        this.delete.emit(this.order);
      },
      filterCourses: function(courses,string){
        return (string)?courses.filter(function(e){return e.name.toLowerCase().includes(string.toLowerCase())} ): courses;

      },
      filteredPossibleAddableEqualRequisites: function(){
        return this.filterCourses(this.possibleAddableEqualRequisites(), this.searchEqualRequisites);
      },
      filteredPossibleAddablePreRequisites: function(){
        return this.filterCourses(this.possibleAddablePreRequisites(), this.searchPreRequisites);
      },
      possibleEqualRequisites: function(){

        var courses = [];
        for (var i = 1; i <= this.yearOrder; i++) {
          courses.push(this.program.getCoursesOfYear(i))
        }
        return courses
          .reduce(function(arr,e){return arr.concat(e)},[])
      },
      possiblePreRequisites: function(){

        var courses = [];
        for (var i = 1; i < this.yearOrder; i++) {
          courses.push(this.program.getCoursesOfYear(i))
        }
        return courses
          .reduce(function(arr,e){return arr.concat(e)},[])
      },
      possibleAddableEqualRequisites: function(){
        var me = this;

        return this.possibleEqualRequisites()
          .filter(function(e){return !me.data.equalrequisites.includes(e.id) && !me.data.prerequisites.includes(e.id)  && me.data.id != e.id});

      },
      possibleAddablePreRequisites: function(){
        var me = this;

        return this.possiblePreRequisites()
          .filter(function(e){return !me.data.equalrequisites.includes(e.id) && !me.data.prerequisites.includes(e.id)  && me.data.id != e.id});

      },
      getCourseWithName: function(courses,string){
          var c = courses.filter(function(e){return e.name.toLowerCase() == string.toLowerCase()});
          return (c.length >0)? c[0]: null;
      },
      getCourseWithId: function(courses,string){
          var c = courses.filter(function(e){return e.id == string});
          return (c.length >0)? c[0]: null;
      },
      getEqualRequisite: function(id){
        return this.getCourseWithId(this.possibleEqualRequisites(),id)
      },
      getPreRequisite: function(id){
        return this.getCourseWithId(this.possiblePreRequisites(),id)
      },
      getTypedEqualRequisite: function(){
        return this.getCourseWithName(this.filteredPossibleAddableEqualRequisites(),this.searchEqualRequisites)
      },
      getTypedPreRequisite: function(){
        return this.getCourseWithName(this.filteredPossibleAddablePreRequisites(),this.searchPreRequisites)
      },
      addEqualRequisite: function(){
          this.data.equalrequisites.push(this.getTypedEqualRequisite().id);
          this.searchEqualRequisites = "";
      },
      addPreRequisite: function(){
          this.data.prerequisites.push(this.getTypedPreRequisite().id);
          this.searchPreRequisites = "";
      },
      removeEqualRequisite: function(id){
        this.data.equalrequisites.splice(this.data.equalrequisites.indexOf(id),1);
      },
      removePreRequisite: function(id){
        this.data.prerequisites.splice(this.data.prerequisites.indexOf(id),1);
      },
      copyToclipboard: function(){
        this.clipboard.copyCourse(this.data);
      },
      pasteFromclipboard: function(){
        var c =this.clipboard.getCourse();
        this.data.id             = c.id            ;
        this.data.name           = c.name          ;
        this.data.prerequisites  = c.prerequisites ;
        this.data.equalrequisite = c.equalrequisite;
        this.data.graduationyear = c.graduationyear;
        this.data.start          = c.start         ;
        this.data.duration       = c.duration      ;
        this.data.studypoints    = c.studypoints   ;
        this.data.pass           = c.pass          ;
        this.data.dispensation   = c.dispensation  ;
        this.data.url            = c.url           ;

      }
    });
})(window.app || (window.app = {}));
