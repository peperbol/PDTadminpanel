(function(app) {
  app.LoginComponent =
    ng.core.Component({
      selector: '.login',
      templateUrl: 'views/login.html'
    })
    .Class({
      constructor: [
        app.ApiService,
        ng.material.MdSnackBar,
        function(ApiService,MdSnackBar) {
          this.name="";
          this.pass="";
          this.api = ApiService;
          this.snackBar = MdSnackBar;
        }
      ],
      login: function(){
        var me = this;
        this.api.login(this.name, this.pass).then(function(error){
          if(!error){
            me.snackBar.open("Sucessvol ingelogd","", {
              duration: 1500,
            });
          } else{
              me.snackBar.open(error,"", {
                duration: 3000,
              });
          }
        });
      }

    });
})(window.app || (window.app = {}));
