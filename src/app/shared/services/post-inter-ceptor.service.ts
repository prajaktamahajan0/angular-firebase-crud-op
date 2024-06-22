
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, finalize, takeUntil } from 'rxjs';
import { LodersService } from './loders.service';


@Injectable({
  providedIn: 'root'
})
export class PostInterceptorService implements HttpInterceptor {
  unsubscribeAll$: Subject<void> = new Subject<void>()
  constructor(
    private _loaderService: LodersService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.loadingState$.next(true)
    return next.handle(req)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        delay(900),
        finalize(() => {
          this._loaderService.loadingState$.next(false);
        })
      )
  }
  unsubscribeAll() {
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }
}
