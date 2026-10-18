import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ apiKey: "AIzaSyAUivGBJHXy-Y6NNYLbbUg_O_8ENQew-ec", authDomain: "tpapi-611e8.firebaseapp.com", projectId: "tpapi-611e8", storageBucket: "tpapi-611e8.firebasestorage.app", messagingSenderId: "105089762453", appId: "1:105089762453:web:376eed26852dc628cc879c", measurementId: "G-VSW1CYD05Y" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
// configuration de provideHttpClient(): autorise angular a communiquer avec API par internet ou avec backend

