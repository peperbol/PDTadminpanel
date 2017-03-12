(function(app) {
  app.CourseComponent =
    ng.core.Component({
      selector: '.course',
      templateUrl: 'views/course.html',
      inputs: ["data", "order", "first", "last", "lastYear", "program", "yearOrder"],
      outputs:["moveUp","moveDown", "delete"]
    })
    .Class({
      constructor: function() {
        var me = this;
          this.endperiode = 1;
          this.startperiode = 0;
          this.searchEqualRequisites = "";
          this.searchPreRequisites = "";
          this.open = false;
          this.moveUp = new ng.core.EventEmitter();
          this.moveDown = new ng.core.EventEmitter();
          this.delete = new ng.core.EventEmitter();
      },
      ngOnInit(){

          this.startperiode= this.data.start-1;
          this.endperiode= 5- (this.data.start+this.data.duration);
      },
      changeEnd(e){
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
      changeStart(e){
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
      moveUpF(){
        this.moveUp.emit(this.order);
      },
      moveDownF(){
        this.moveDown.emit(this.order);
      },
      deleteF(){
        this.program.removeRequisites(this.data.id)
        this.delete.emit(this.order);
      },
      filterCourses(courses,string){
        return (string)?courses.filter(function(e){return e.name.toLowerCase().includes(string.toLowerCase())} ): courses;

      },
      filteredPossibleAddableEqualRequisites(){
        return this.filterCourses(this.possibleAddableEqualRequisites(), this.searchEqualRequisites);
      },
      filteredPossibleAddablePreRequisites(){
        return this.filterCourses(this.possibleAddablePreRequisites(), this.searchPreRequisites);
      },
      possibleEqualRequisites(){

        var courses = [];
        for (var i = 1; i <= this.yearOrder; i++) {
          courses.push(this.program.getCoursesOfYear(i))
        }
        return courses
          .reduce(function(arr,e){return arr.concat(e)},[])
      },
      possiblePreRequisites(){

        var courses = [];
        for (var i = 1; i < this.yearOrder; i++) {
          courses.push(this.program.getCoursesOfYear(i))
        }
        return courses
          .reduce(function(arr,e){return arr.concat(e)},[])
      },
      possibleAddableEqualRequisites(){
        var me = this;

        return this.possibleEqualRequisites()
          .filter(function(e){return !me.data.equalrequisites.includes(e.id) && !me.data.prerequisites.includes(e.id)  && me.data.id != e.id});

      },
      possibleAddablePreRequisites(){
        var me = this;

        return this.possiblePreRequisites()
          .filter(function(e){return !me.data.equalrequisites.includes(e.id) && !me.data.prerequisites.includes(e.id)  && me.data.id != e.id});

      },
      getCourseWithName(courses,string){
          var c = courses.filter(function(e){return e.name.toLowerCase() == string.toLowerCase()});
          return (c.length >0)? c[0]: null;
      },
      getCourseWithId(courses,string){
          var c = courses.filter(function(e){return e.id == string});
          return (c.length >0)? c[0]: null;
      },
      getEqualRequisite(id){
        return this.getCourseWithId(this.possibleEqualRequisites(),id)
      },
      getPreRequisite(id){
        return this.getCourseWithId(this.possiblePreRequisites(),id)
      },
      getTypedEqualRequisite(){
        return this.getCourseWithName(this.filteredPossibleAddableEqualRequisites(),this.searchEqualRequisites)
      },
      getTypedPreRequisite(){
        return this.getCourseWithName(this.filteredPossibleAddablePreRequisites(),this.searchPreRequisites)
      },
      addEqualRequisite(){
          this.data.equalrequisites.push(this.getTypedEqualRequisite().id);
          this.searchEqualRequisites = "";
      },
      addPreRequisite(){
          this.data.prerequisites.push(this.getTypedPreRequisite().id);
          this.searchPreRequisites = "";
      },
      removeEqualRequisite(id){
        this.data.equalrequisites.splice(this.data.equalrequisites.indexOf(id),1);
      },
      removePreRequisite(id){
        this.data.prerequisites.splice(this.data.prerequisites.indexOf(id),1);
      }
    });
})(window.app || (window.app = {}));
