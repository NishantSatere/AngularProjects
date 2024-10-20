import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"; // Ensure you import from 'rxjs/operators'
import { selectedAuthState } from "../Ngrx/selectors/Auth/auth-selector";
import { AuthState } from "../Ngrx/reducers/Auth/auth-reducer";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    isLoggedIn$: Observable<AuthState>;

    constructor(private store: Store,  private router: Router) {
        this.isLoggedIn$ = this.store.select(selectedAuthState);
    }

    canActivate(): Observable<boolean> {
        console.log("Hello",this.isLoggedIn$)
        return this.store.select(selectedAuthState).pipe(
            map(isLoggedIn => {
                console.log(isLoggedIn)
                if (!isLoggedIn) {
                    console.log(isLoggedIn)
                    this.router.navigate(['/login']);
                    return false;
                }
                return true; 
            })
        );
    }
}
