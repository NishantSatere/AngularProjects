import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { selectIsLoggedIn } from "../Ngrx/Selector/Login-Selector/LoginSelector";
import { AppState } from "../Ngrx/Selector/Login-Selector/LoginSelector";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

//   works with observable to check if user is logged in or not
  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
