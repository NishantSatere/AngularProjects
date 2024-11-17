import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavState } from '../../Ngrx/Selector/Side-Selector/SideSelector';
import { toggleSideBar } from '../../Ngrx/Action/SiderBar-Action/SideAction';
import { selectIsSideBarOpen } from '../../Ngrx/Selector/Side-Selector/SideSelector';
import { AppState, selectIsLoggedIn } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { Route } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSideBarOpen$!: Observable<boolean>; // Observable to capture the sidebar open state
  isOpend!: boolean; // Local variable to store the state
  isLoggedIn$!: Observable<boolean>; // Observable to capture the login state
  isLoggedin!: boolean; // Local variable to store the state

  constructor(private store: Store<NavState>, private store1: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isSideBarOpen$ = this.store.select(selectIsSideBarOpen); 
    this.isSideBarOpen$.subscribe((data) => {
      this.isOpend = data;
    })
    this.isLoggedIn$ = this.store1.select(selectIsLoggedIn); 
    this.isLoggedIn$.subscribe((data) => {
      this.isLoggedin = data;
    })
  }

  toggleDrawer(): void {
    // Dispatch the action to toggle the sidebar state
    this.store.dispatch(toggleSideBar({ isSideBarOpen: !this.isOpend }));
  }

  // route to profile page
  profile(): void {
    this.router.navigate(['profile']);
  }
}
