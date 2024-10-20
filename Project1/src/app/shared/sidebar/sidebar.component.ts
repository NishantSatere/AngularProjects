import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedIsDrawerOpen } from '../../Ngrx/selectors/sidebar/sidebar-selector';
import { toggleDrawer } from '../../Ngrx/actions/siderbar/sidebar-action';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  
  isDrawerOpen$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isDrawerOpen$ = this.store.select(selectedIsDrawerOpen);
  }

}
