(function(app) {
  app.AppModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule,ng.forms.FormsModule, ng.material.MaterialModule ],
      declarations: [ app.AppComponent, app.ProgramComponent, app.ProgramLoaderComponent,app.YearComponent,app.CourseComponent,app.LoginComponent, app.PeriodenControlComponent],
      providers: [ app.ApiService, app.ClipboardService],
      bootstrap: [ app.AppComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
