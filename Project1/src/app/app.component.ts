import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavSideComponent } from '../shared/nav-side/nav-side.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavSideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project1';
}
