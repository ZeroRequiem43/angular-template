import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './keycloak.service';

export const authGuard: CanActivateFn = async (_, state) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  await authService.instance.login({
    redirectUri: window.location.origin + state.url,
  });

  return false;
};
