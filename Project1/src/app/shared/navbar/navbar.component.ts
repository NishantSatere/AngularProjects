import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectedIsDrawerOpen } from '../../Ngrx/selectors/sidebar/sidebar-selector';
import { toggleDrawer } from '../../Ngrx/actions/siderbar/sidebar-action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDrawerOpen$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isDrawerOpen$ = this.store.select(selectedIsDrawerOpen);
    this.isDrawerOpen$.subscribe(isOpen => {
      console.log('Initial drawer state:', isOpen);
    });
  }

  toggleDrawer() {
    this.store.dispatch(toggleDrawer());
  }
}
