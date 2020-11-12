import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './services';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!!this.authService.getFBAccessToken()) {
      return next.handle(request.clone({setHeaders: {Authorization: `Bearer ${this.authService.getFBAccessToken()}`}}));
    }
    if (!!this.authService.getAccessToken()) {
      return next.handle(request.clone({setHeaders: {Authorization: `JWT ${this.authService.getAccessToken()}`}}));
    }
    // console.log(this.authService.getFBAccessToken());
    return next.handle(request);
  }
}
