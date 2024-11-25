import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEmployee } from '../../services/employeeDataServices/getEmployee';
import { Employee } from '../../services/employeeDataServices/employeeModel';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HighlightOnHoverDirective } from '../../directive/HighlightOnHover';
import { AgePipe,
  SalaryConverator,
  CustomDatePipe,
  AddressPipe
 } from '../../Pipes/DeatilsFormating';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,AgePipe,SalaryConverator,CustomDatePipe,AddressPipe,HighlightOnHoverDirective],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  constructor(private route: ActivatedRoute,
    private getEmployee: getEmployee
  ){}

  isLoading:boolean = false
  ngOnInit(): void {
    const employeeId:string | null = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeData(employeeId)
      console.log(employeeId);
    } 
  }
  employee!:Employee;
  errorMessage: string = '';
  employeeData(id:string) : void{
    this.isLoading = true
    this.getEmployee.getEmployeeData(id).subscribe({
      next: (data) => {
        this.employee = data
        console.log(data)
        this.isLoading = false
      },
      error:(err) => {
        console.log(err)
        this.errorMessage = err
        this.isLoading = false
      }
    })
  }
}
