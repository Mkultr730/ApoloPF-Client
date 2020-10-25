import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private firestore: AngularFirestore, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.user$.pipe(
        take(1),
        map(user => {
          let isAdmin = false;
          this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            tap(userInfo => isAdmin = userInfo['role'] === 'admin')
          );
          return isAdmin;
        }),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/']);
          }
        })
      );
  }

}
