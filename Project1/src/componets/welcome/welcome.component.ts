import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { AppState } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { logout } from '../../Ngrx/Action/Login-Action/loginAction';
import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';

import { removeSideState } from '../../Ngrx/Action/SiderBar-Action/SideAction';
import { NavState } from '../../Ngrx/Selector/Side-Selector/SideSelector';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  isLoggedIn$!: Observable<boolean>;
  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;

  constructor(private router: Router, private store: Store<AppState>, private store1: Store<SidePageStateGlobal>, private store2: Store<NavState>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isSidePageSelected$ = this.store1.select(selectSelectedPage);
    this.isSidePageSelected$.subscribe((data) => {
      this.isSidePageSelected = data;
    })
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
    this.router.navigate(['/']);
    this.store2.dispatch(removeSideState());
    this.store1.dispatch(selectedPage({ page: "Dashboard" }));
  }
  
  redirecttologin(): void {
    this.router.navigate(['/login']);
    this.store1.dispatch(selectedPage({ page: "Login" }));
  }
}
