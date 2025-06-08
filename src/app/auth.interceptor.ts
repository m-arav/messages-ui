import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    req = req.clone({ setHeaders: { Authorization: token } });
  }

  return next(req).pipe(
    catchError(err => {
        if (err.status == 401) {
            router.navigate(["/login"]);
        }
        return throwError(()=> err);
    })
  );
};