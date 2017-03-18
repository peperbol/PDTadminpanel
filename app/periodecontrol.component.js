(function(app) {
  app.PeriodenControlComponent =
    ng.core.Component({
      selector: '.periode',
      templateUrl: 'views/periodecontrol.html',
      inputs: ["periodestart","periodeduration"]
    })
    .Class({
      constructor: [
        ng.core.ElementRef,
        function(element) {
          this.element  = element.nativeElement;
          this.dragingleftHandle = 0;
          this.dragingrightHandle = 0;
          this.dragbody = 0;
          this.dragstartPosition = null;
        }
      ],
      getTotalWidth:function(){
        return this.element.clientWidth;

      },
      getDraggedStart: function(){
        return this.periodestart+ this.dragingleftHandle+this.dragbody;
      },
      getDraggedDuration: function(){
        return this.periodeduration + this.dragingrightHandle -this.dragingleftHandle ;
      },
      getStartWidth: function(){
        return (this.clampStart(this.getDraggedStart())- 1) * 100 / 4;
      },
      getEndWidth: function(){
        return 100 - (this.clampStart(this.getDraggedStart())- 1 + this.clampDuration(this.getDraggedDuration())) * 100 / 4;
      },
      dragRightHandle: function(e){
        if(e.pageX>0){
          this.dragingrightHandle = ((e.pageX -this.dragstartPosition.x)/this.getTotalWidth()) *4;
        }
        return true;
      },
      dragBody: function(e){
        if(e.pageX>0){
          this.dragbody = ((e.pageX -this.dragstartPosition.x)/this.getTotalWidth()) *4;
        }
        return true;
      },
      dragLeftHandle: function(e){
        if(e.pageX>0){
          this.dragingleftHandle = ((e.pageX -this.dragstartPosition.x)/this.getTotalWidth()) *4;
        }
        return true;
      },
      dragStart: function(e){
        this.dragstartPosition = {x:e.pageX,y:e.pageY};
        console.log("dragstart");
        return true;
      },
      dragEnd: function(e){
        var start = Math.round(this.clampStart(this.getDraggedStart()))
        var end = Math.round(this.clampDuration(this.getDraggedDuration()))
        this.periodestart = start ;

        this.periodeduration = end;
        this.dragingrightHandle = 0;
        this.dragingleftHandle = 0;
        this.dragbody = 0;
        return true;
      },
      clampStart: function(start){
        return Math.max( Math.min( start, 5-this.getDraggedDuration()), 1);
      },
      clampDuration: function(duration){
        return Math.max( Math.min( duration, 5-this.getDraggedStart()), 1);
      }

    });
})(window.app || (window.app = {}));
