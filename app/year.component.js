(function(app) {
  app.YearComponent =
    ng.core.Component({
      selector: '.year',
      templateUrl: 'views/year.html',
      inputs: ["data", "lastYear", "program","nextId"],
      outputs:["delete"]
    })
    .Class({
      constructor: [
        app.ClipboardService,
        function(clipboard) {
          this.delete = new ng.core.EventEmitter();
          this.clipboard = clipboard;
        }
      ],
      newCourse:function(){
        this.data.courses.push(app.Data.newCourse(this.program.newId()));
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
      deleteYear: function(){
        this.delete.emit(this.data.order-1);
      },
      copyToclipboard: function(){
        this.clipboard.copyYear(this.data);
      },
      pasteFromclipboard: function(){
        var c =this.clipboard.getYear();
        this.data.courses= c.courses;
      }

    });
})(window.app || (window.app = {}));
