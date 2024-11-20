import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { Employee } from "./employeeModel";

@Injectable({
    providedIn: 'root',
})

export class getEmployeeService {
    private apiURL: string = 'https://673db3510118dbfe86086276.mockapi.io/mockapi/v1/employees'

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiURL).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errormsg = "An unknown error occured!"
        if(error.error instanceof ErrorEvent){
            errormsg = `Error: ${error.error.message}`
        }else{
            errormsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errormsg))
    }
}