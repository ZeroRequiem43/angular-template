import { Injectable, signal } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = new Keycloak({
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
  });

  public readonly isAuthenticated = signal(false);
  public readonly userProfile = signal<KeycloakProfile | null>(null);

  get instance(): Keycloak {
    return this.keycloak;
  }

  async init(): Promise<void> {
    try {
      this.keycloak.onAuthRefreshError = () => this.logout();

      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
      });

      this.isAuthenticated.set(authenticated);

      if (authenticated) {
        const profile = await this.keycloak.loadUserProfile();
        this.userProfile.set(profile);
      }
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    this.isAuthenticated.set(false);
    this.userProfile.set(null);

    return this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
