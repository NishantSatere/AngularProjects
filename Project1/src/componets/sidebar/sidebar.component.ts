import { Component} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {MatDrawerContent } from '@angular/material/sidenav';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { NavState, selectIsSideBarOpen } from '../../Ngrx/Selector/Side-Selector/SideSelector';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AppState, selectIsLoggedIn } from '../../Ngrx/Selector/Login-Selector/LoginSelector';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
// import { toggleSideBar } from '../../Ngrx/Action/SiderBar-Action/SideAction';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconButton, NavbarComponent,RouterOutlet, MatDrawerContent, MatDrawerContainer, MatDrawer],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Correct typo: changed to styleUrls
})
export class SidebarComponent {
  isSideBarOpen$!: Observable<boolean>
  isOpend!: boolean;

  isLoggedin$!: Observable<boolean>;
  isLoggedin!: boolean;

  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;


  constructor(private store: Store<NavState>,private store1:Store<AppState>, private store2:Store<SidePageStateGlobal>,private router: Router) { }
  ngOnInit(): void {
    this.isSideBarOpen$ = this.store.select(selectIsSideBarOpen); 
    this.isLoggedin$ = this.store1.select(selectIsLoggedIn);
    this.isSidePageSelected$ = this.store2.select(selectSelectedPage);
    this.isSideBarOpen$.subscribe((data) => {
      this.isOpend = data;
    })

    this.isLoggedin$.subscribe((data) => {
      this.isLoggedin = data;
    })
    this.isSidePageSelected$.subscribe((data) => {
      this.isSidePageSelected = data;
      // console.log(data);
    })
  }

  // route to home page
  home() {
    this.router.navigate(['']);
    this.store2.dispatch(selectedPage({page: "Dashboard"}));
  }
  
  // route to employees page
  employees() {
    this.router.navigate(['employees']);
    this.store2.dispatch(selectedPage({page: "employees"}));
  }

  login(){
    this.router.navigate(['/login']);
    this.store2.dispatch(selectedPage({page: "login"}));
  }
}
