import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-combined-nav-side-bar',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './combined-nav-side-bar.component.html',
  styleUrl: './combined-nav-side-bar.component.scss'
})
export class CombinedNavSideBarComponent {

}
