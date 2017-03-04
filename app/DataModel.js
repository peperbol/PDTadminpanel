(function(app) {
  app.Data = {
    newYear: function(num = 1){
      return {
        "order": num,
        "courses":[]
      }
    },
    newCourse: function(id = 1){
      return {
        "id":1,
        "name":"newCourse",
        "prerequisites":[],
        "equalrequisites":[],
        "graduationyear":false,
        "start":1,
        "duration":1,
        "studypoints":1,
        "pass": true,
        "dispensation": false,
        "url": ""
      }
    }
  };
})(window.app || (window.app = {}));
