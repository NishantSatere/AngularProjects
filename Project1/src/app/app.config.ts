import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { _loginReducer } from './Ngrx/Reducer/Login-Reducer/loginReducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SideReducer } from './Ngrx/Reducer/SideBar-Reducer/SideReducer';
import { SelectePageReducer } from './Ngrx/Reducer/SideBar-Reducer/SelectedPageReducer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideStore({ login: _loginReducer , side: SideReducer, sidePage:SelectePageReducer}),
    provideAnimationsAsync(),
    provideHttpClient(),
  ]
};
