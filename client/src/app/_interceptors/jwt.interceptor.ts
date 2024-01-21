import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {  
  let accountService = inject(AccountService);  
  var token = accountService.getCurrentUser()?.token; 
  let reqWithToken = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    }
  });
  return next(reqWithToken);
  
};
