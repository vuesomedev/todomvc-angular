import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { createStore } from './store';

export const appConfig: ApplicationConfig = {
  providers: [provideStore(createStore())]
};
