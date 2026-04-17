import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './keycloak.service';


let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}


function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
): Observable<HttpEvent<unknown>> {
  const kc = authService.instance;

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return from(kc.updateToken(-1)).pipe(
      catchError((refreshErr) => {
        isRefreshing = false;
        return throwError(() => refreshErr);
      }),
      switchMap(() => {
        isRefreshing = false;
        const token = kc.token;

        if (!token) {
          return throwError(() => new Error('Refresh succeeded but token is missing'));
        }

        refreshTokenSubject.next(token);

        return next(addToken(req, token)).pipe(
          catchError((retryErr: HttpErrorResponse) => {
            if (retryErr.status === 401) {
              void authService.logout();
            }
            return throwError(() => retryErr);
          }),
        );
      }),
    );
  }

  return refreshTokenSubject.pipe(
    filter((token): token is string => !!token),
    take(1),
    switchMap((token) => {
      return next(addToken(req, token)).pipe(
        catchError((retryErr: HttpErrorResponse) => {
          if (retryErr.status === 401) {
            void authService.logout();
          }
          return throwError(() => retryErr);
        }),
      );
    }),
  );
}


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const kc = authService.instance;

  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  return from(kc.updateToken(30)).pipe(
    catchError((error) => {
      isRefreshing = false;
      authService.logout();
      return throwError(() => error);
    }),
    switchMap(() => {
      const token = kc.token;
      if (!token) {
        return throwError(() => new Error('No token found'));
      }

      refreshTokenSubject.next(token);
      return next(addToken(req, token)).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return handle401Error(req, next, authService);
          }

          return throwError(() => error);
        }),
      );
    }),
  );
};
