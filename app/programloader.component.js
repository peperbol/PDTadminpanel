(function(app) {
  app.ProgramLoaderComponent =
    ng.core.Component({
      selector: '.programloader',
      templateUrl: 'views/programloader.html',
      inputs: ["data"]
    })
    .Class({
      constructor: [
        app.ApiService,
        function(ApiService) {
          this.api = ApiService

          this.selectedProgram = null;
          this.selectedProgramName = "";
          this.selectedGradProgramName = "";
          this.enableRenameControls = false;
          this.grad = new ng.forms.FormControl();
          //this.gradProgramNameControl = new ng.forms.FormControl();
          //this.programNameControl.valueChanges.forEach(this.checkProgram);
          //this.gradProgramNameControl.valueChanges.forEach(this.checkProgram);
        }
      ],
      checkProgram: function(value){
        var me  = this
        console.log(this.grad.value);
        new Promise(function(){
          setTimeout(function(){

            var prog = me.data.filter(function(e){
              return e.program ==me.selectedProgramName && e.graduationprogram == me.selectedGradProgramName
            })
            if(prog.length> 0) {
              me.selectedProgram = prog[0];
              me.enableRenameControls = false;
            } else if(me.selectedProgramName) {
              me.enableRenameControls = true;
            } else{
              me.enableRenameControls = false;
            }

          }, 200)
        });
      },
      saveProgram:function(){
        this.api.updateProgram(this.selectedProgram.objectId, app.Data.copyProgram(this.selectedProgram))
      },
      addProgram: function(){
        var me = this;
        var newProgram =app.Data.newProgram(this.selectedProgramName|| "new Program",this.selectedGradProgramName,[
          app.Data.newYear(1)
        ])
        this.api.newProgram( newProgram).then(
          function(id){
            newProgram.objectId = id;
            me.data.push(newProgram);
          }
        );
        this.checkProgram();
      },
      getProgramNames: function(){
        if(!this.data) return [];

        var result = this.data
          .map(function(x){return x.program})
          .reduce(function(arr,val){
            return (arr.includes(val))? arr : arr.concat(val);
          }, []);

          return result;
      },
      getGradProgramNames: function(){
        var me = this;

        if(!this.data || !this.selectedProgramName) return [];

        var result = this.data
            .filter(function(x){return x.program == me.selectedProgramName})
            .map(function(x){return x.graduationprogram});

        return result;
      },
      rename: function(){
        this.selectedProgram.program = this.selectedProgramName;
        this.selectedProgram.graduationprogram = this.selectedGradProgramName;
        this.saveProgram();
      }
    });
})(window.app || (window.app = {}));
