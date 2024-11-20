import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedPage } from '../../Ngrx/Action/SiderBar-Action/SelectedPageAction';
import { SidePageStateGlobal } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { selectSelectedPage } from '../../Ngrx/Selector/Side-Selector/SelectedPageSelector';
import { Observable } from 'rxjs';
import { getEmployeeService } from '../../services/employeeDataServices/getEmployeeDataService';
import { Employee } from '../../services/employeeDataServices/employeeModel';
import { CommonModule } from '@angular/common';
import { getEmployee } from '../../services/employeeDataServices/getEmployee';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  isSidePageSelected$!: Observable<string>;
  isSidePageSelected!: string;
  employees: Employee[] = [];
  isLoading: boolean = false;  
  errorMessage: string = ''
  constructor(private store: Store<SidePageStateGlobal>, 
    private getEmployeeService: getEmployeeService,
    private getEmployee: getEmployee,
    private router: Router) {}

  ngOnInit() {
    this.isSidePageSelected$ = this.store.select(selectSelectedPage);
    this.store.dispatch(selectedPage({ page: "employees" }));
    this.fetchEmployees();
    // this.consoledata();
  }

  private fetchEmployees(){
    this.isLoading = true
    this.getEmployeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
        // this.consoledata()
      },
      error: (err) => {
        console.log(err.message)
        this.errorMessage = err
        this.isLoading = false;
      }
    })
  }
  consoledata(){
    console.log("data",this.employees)
  }
  employee!:Employee;
  employeeData(employee:Employee) : void{
    this.router.navigate([`/employees`, employee.id])
  }
}
