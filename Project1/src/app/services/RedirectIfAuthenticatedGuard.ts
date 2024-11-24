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
export class RedirectIfAuthenticatedGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          // Redirect to the home page or any other route if the user is logged in
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
