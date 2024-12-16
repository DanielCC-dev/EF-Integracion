import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

export const userGuardGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('jwt_token');

  if (token) {
    return of(true); 
  } else {
    setTimeout(() => {
      router.navigate(['/']); 
    });
    return of(false); 
  }
};
