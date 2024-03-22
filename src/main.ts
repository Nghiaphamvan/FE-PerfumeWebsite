import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { bootstrapApplication } from '@angular/platform-browser';

// import { AppComponent } from './app/app.component';
// import { MainPage } from './app/MainPage/main';

// import { provideRouter } from '@angular/router';

import { AppModule } from './app/app.module';

// import routeConfig from './app/routes';

// bootstrapApplication(MainPage, {
//   providers: [
//     provideRouter(routeConfig)
//   ]
// }).catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



