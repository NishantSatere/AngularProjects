import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { logout } from '../../Ngrx/Action/Login-Action/loginAction';
import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { removeSideState } from '../../Ngrx/Action/SiderBar-Action/SideAction';
import { NavState } from '../../Ngrx/Selector/Side-Selector/SideSelector';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private store: Store<AppState>, private store1: Store<SidePageStateGlobal>, private store2: Store<NavState>, private router: Router) {}
  email!:string | null
  token!:string | null
  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;

  ngOnInit() {
    this.isSidePageSelected$ = this.store1.select(selectSelectedPage);
    this.store1.dispatch(selectedPage({ page: "profile" }));
    this.isSidePageSelected$.subscribe((data) => {
      this.isSidePageSelected = data;
    })
    this.email = localStorage.getItem('email')
    this.token = localStorage.getItem('token')
  }

  onLogout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
    this.store1.dispatch(selectedPage({ page: "Dashboard" }));
    this.store2.dispatch(removeSideState());
  }
}
