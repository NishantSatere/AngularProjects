import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../../Ngrx/Selector/LoginSelector';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Correct typo: changed to styleUrls
})
export class SidebarComponent {
  
  isLoggedIn$!: Observable<boolean>;
  constructor(private store: Store<{ login: any }>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    // this.isLoggedIn$.subscribe((data) => {
    //   this.isLoogedIn = data;
    // });
    // console.log(this.isLoogedIn);
  }
  
  

}
