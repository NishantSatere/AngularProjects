import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Employee } from "./employeeModel";

@Injectable({
  providedIn: 'root',
})
export class getEmployee {
  private apiURL: string = 'https://673db3510118dbfe86086276.mockapi.io/mockapi/v1/employees';

  constructor(private http: HttpClient) {}

  // Get employee data by ID
  getEmployeeData(id: string): Observable<Employee> {
    const url = `${this.apiURL}/${id}`; // Correctly append the id to the URL
    return this.http.get<Employee>(url).pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errormsg = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      errormsg = `Error: ${error.error.message}`;
    } else {
      errormsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errormsg));
  }
}
