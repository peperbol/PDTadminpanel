(function(app) {
  app.ApiService =
    ng.core.Injectable(
    )
    .Class({
      constructor: [
        ng.http.Http,
        function(Http) {
          this.http = Http;
          this.apiUrl = "testData/mct-web.json"
        }
      ],
      getData: function(){
        return this.http.get(this.apiUrl)
              .toPromise()
              .then(function( dataresult ) {
                return dataresult.json().data;
              })
              .catch(function( error ) {
                console.log(error);
              });
      }

    });
})(window.app || (window.app = {}));
