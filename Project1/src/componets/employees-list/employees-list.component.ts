import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;
  constructor(private store: Store<SidePageStateGlobal>) {}

  ngOnInit() {
    this.isSidePageSelected$ = this.store.select(selectSelectedPage);
    this.store.dispatch(selectedPage({ page: "employees" }));
  }

}
