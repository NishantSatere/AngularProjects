import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavState } from '../../Ngrx/Selector/Side-Selector/SideSelector';
import { toggleSideBar } from '../../Ngrx/Action/SiderBar-Action/SideAction';
import { selectIsSideBarOpen } from '../../Ngrx/Selector/Side-Selector/SideSelector';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSideBarOpen$!: Observable<boolean>; // Observable to capture the sidebar open state
  isOpend!: boolean; // Local variable to store the state

  constructor(private store: Store<NavState>) {}

  ngOnInit(): void {
    // Subscribe to the state of the sidebar (isSideBarOpen)
    this.isSideBarOpen$ = this.store.select(selectIsSideBarOpen); 
    this.isSideBarOpen$.subscribe((data) => {
      this.isOpend = data; // Update local variable when the state changes
    });
  }

  toggleDrawer(): void {
    // Dispatch the action to toggle the sidebar state
    this.store.dispatch(toggleSideBar({ isSideBarOpen: !this.isOpend }));
  }
}
