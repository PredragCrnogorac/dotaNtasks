import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService) { }



  canActivate(next, state): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(logggedIn => {
        if (!logggedIn) {
          this.messageService.add({
            severity: 'info', summary: 'Access denied', detail: `You're not logged in`
          });
          this.router.navigate(['/']);
        }
      })
    );
  }

}
