(function(app) {
  app.ClipboardService =
    ng.core.Injectable(
    )
    .Class({
      constructor: [
        function(){
        this.course = null;
        this.year = null;
      }
      ],
      copyCourse: function(course){
        this.course = JSON.stringify(course);
      },
      getCourse: function(){
        return JSON.parse(this.course);
      },
      hasCourse: function(){
        return this.course != null
      },
      copyYear: function(year){
        this.year = JSON.stringify(year);
      },
      getYear: function(){
        return JSON.parse(this.year);
      },
      hasYear: function(){
        return this.year != null
      },
    });
})(window.app || (window.app = {}));
