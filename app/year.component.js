(function(app) {
  app.YearComponent =
    ng.core.Component({
      selector: '.year',
      templateUrl: 'views/year.html',
      inputs: ["data", "lastYear"],
      outputs:["delete"]
    })
    .Class({
      constructor: [
        function() {
          this.delete = new ng.core.EventEmitter();
        }
      ],
      newCourse:function(){
        this.data.courses.push(app.Data.newCourse());
      },
      moveUp: function(i){
        this.data.courses.splice(i-1, 0,this.data.courses.splice(i,1)[0]);
      },
      moveDown: function(i){
        this.data.courses.splice(i+1, 0,this.data.courses.splice(i,1)[0]);
      },
      deleteAt: function(i){
        this.data.courses.splice(i,1);
      },
      deleteYear(){
        this.delete.emit(this.data.order-1);
      }

    });
})(window.app || (window.app = {}));
