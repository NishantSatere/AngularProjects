import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../componets/navbar/navbar.component';
import { SidebarComponent } from '../../componets/sidebar/sidebar.component';

@Component({
  selector: 'app-nav-side',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,NavbarComponent],
  templateUrl: './nav-side.component.html',
  styleUrl: './nav-side.component.scss'
})
export class NavSideComponent {

}
