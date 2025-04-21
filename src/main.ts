import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component'; // Assuming AppComponent is in ./app/
import { routes } from './app/app.routes'; // Assuming routes are in ./app/app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule) // For Material animations
  ]
}).catch(err => console.error(err));
