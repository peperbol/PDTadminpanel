(function(app) {
  app.ApiService =
    ng.core.Injectable(
    )
    .Class({
      constructor: [
        ng.http.Http,
        function(Http) {
          this.http = Http;
          this.apiUrl = "http://146.185.168.179:1337/parse/";
          this.progamsclass = "programs/";
          this.headers = {headers: new ng.http.Headers()};
          this.headers.headers.append("X-Parse-Application-Id","PDT");
          this.headers.headers.append("Content-Type","application/json");
        }
      ],
      getAllPrograms: function(){
        return this.http.get(this.apiUrl + "classes/" + this.progamsclass, this.headers)
              .toPromise()
              .then(function( dataresult ) {
                console.log(dataresult.json());
                return dataresult.json().results;
              })
              .catch(function( error ) {
                console.log(error);
              });
      },
      newProgram: function(name,gradname, years){
        return this.http.post(this.apiUrl + "classes/" + this.progamsclass,
        {
          "program":name,
          "graduationprogram":gradname,
          "years":years
        },
        this.headers)
              .toPromise()
              .then(function( dataresult ) {
                return dataresult.json().result;
              })
              .catch(function( error ) {
                console.log(error);
              });
      }

    });
})(window.app || (window.app = {}));
