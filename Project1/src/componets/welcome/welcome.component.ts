import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { AppState } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { logout } from '../../Ngrx/Action/Login-Action/loginAction';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  onButtonClick(): void {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.onLogout();
      } else {
        this.redirecttologin();
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
  
  redirecttologin(): void {
    this.router.navigate(['login']);
  }
}
