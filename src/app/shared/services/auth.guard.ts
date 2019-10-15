import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService) { }

    canActivate(next, state): Observable<boolean> {
      return this.auth.user$.pipe(
        take(1),
        map(user => _.has( _.get(user, 'roles'), 'admin')),
        tap(logggedIn => {
                if (!logggedIn) {
                  this.messageService.add({
                    severity: 'error', summary: 'Error', detail: 'Access denied'});
                  this.router.navigate(['/']);
                }
              })
      );
    }
}
