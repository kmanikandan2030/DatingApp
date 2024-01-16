import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse)=>{
        switch(error.status){
          case 400:      
            if(error.error.errors)            
              throw Object.values(error.error.errors).flat();                          
            else            
                toastr.error(error.error, error.status.toString())            
            break;
          case 401:
            toastr.error('Unauthorized', error.status.toString())
            break;
          case 404:
            router.navigateByUrl('/not-found')
            break;
          case 500:
            const navigationExtras: NavigationExtras = {state: {serverError: error.error}}
            router.navigateByUrl('/server-error', navigationExtras)
            break;
          default:
            toastr.error('Something unexpected went wrong')
            console.log(error);            
            break;            
        }      
      throw error;
    })

  );
};
