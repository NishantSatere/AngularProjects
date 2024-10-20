import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';
import { sidebarReducer } from './app/Ngrx/reducers/sidebar/siderbar-reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ sidebar: sidebarReducer }),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
