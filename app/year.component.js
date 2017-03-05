(function(app) {
  app.YearComponent =
    ng.core.Component({
      selector: '.year',
      templateUrl: 'views/year.html',
      inputs: ["data"]
    })
    .Class({
      constructor: [
        function() {
        }
      ],
      newCourse:function(){
        this.data.courses.push(app.Data.newCourse());
      }

    });
})(window.app || (window.app = {}));
