(function(app) {
  app.AppModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule,ng.forms.FormsModule, ng.material.MaterialModule ],
      declarations: [ app.AppComponent, app.ProgramComponent],
      providers: [ app.ApiService],
      bootstrap: [ app.AppComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
