import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {MatDrawerContent } from '@angular/material/sidenav';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { NavState, selectIsSideBarOpen } from '../../Ngrx/Selector/Side-Selector/SideSelector';
import { NavbarComponent } from '../navbar/navbar.component';
// import { toggleSideBar } from '../../Ngrx/Action/SiderBar-Action/SideAction';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet, MatDrawerContent, MatDrawerContainer, MatDrawer],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Correct typo: changed to styleUrls
})
export class SidebarComponent {
  isSideBarOpen$!: Observable<boolean>
  isOpend!: boolean;

  constructor(private store: Store<NavState>) { }
  ngOnInit(): void {
    this.isSideBarOpen$ = this.store.select(selectIsSideBarOpen); 
    this.isSideBarOpen$.subscribe((data) => {
      this.isOpend = data;
    })
  }
  
}
