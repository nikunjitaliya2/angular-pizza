import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem(environment.TokenKey)){
      return true;
    }
    else{
      this.router.navigateByUrl('/auth');
      return false;
    }
  }

}
