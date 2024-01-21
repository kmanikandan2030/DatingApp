import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../_services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busySvc = inject(BusyService);
  busySvc.busy();
  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      busySvc.idle()
    })
  );
};
