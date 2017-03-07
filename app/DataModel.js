(function(app) {
  app.Data = {
    newProgram:function(name, gradname,years){
      return {
        "program":name,
        "graduationprogram":gradname,
        "years":years
      }
    },
    copyProgram:function(p){
      return {
        "program":p.program,
        "graduationprogram":p.graduationprogram,
        "years":p.years
      }
    },
    newYear: function(num = 1){
      return {
        "order": num,
        "courses":[]
      }
    },
    newCourse: function(id = 1){
      return {
        "id":id,
        "name":"",
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
