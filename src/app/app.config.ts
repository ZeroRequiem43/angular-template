import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthService } from '@auth/keycloak.service';
import { provideApiConfiguration } from '@core/api/client/api-configuration';
import { routes } from './app.routes.';
import { environment } from '../environments/environment';
import { authInterceptor } from '@auth/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideApiConfiguration(environment.apiUrl),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.init();
    }),
  ],
};
