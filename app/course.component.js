(function(app) {
  app.CourseComponent =
    ng.core.Component({
      selector: '.course',
      templateUrl: 'views/course.html',
      inputs: ["data", "order", "first", "last", "lastYear"],
      outputs:["moveUp","moveDown", "delete"]
    })
    .Class({
      constructor: function() {
        var me = this;
          this.endperiode = 1;
          this.startperiode = 0;
          this.moveUp = new ng.core.EventEmitter();
          this.moveDown = new ng.core.EventEmitter();
          this.delete = new ng.core.EventEmitter();

          new Promise(function(){
            setTimeout(function(){
              me.startperiode= me.data.start-1;
              me.endperiode= 5- (me.data.start+me.data.duration);
            },1000);
          });


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
              console.log("hi");
            },1000)
            console.log("hi");
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
        this.delete.emit(this.order);
      }
    });
})(window.app || (window.app = {}));
