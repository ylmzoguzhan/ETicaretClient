import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/common/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private alertify: AlertifyService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean = true;
    if (token)
      expired = this.jwtHelper.isTokenExpired(token);
    if (expired) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      this.alertify.message("Yetkisiz erişim lütfen giriş yapınız", {
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      })
    }
    return true;
  }
}

