import { Routes } from '@angular/router';
import { LoginComponent } from '../componets/login/login.component';
import { WelcomeComponent } from '../componets/welcome/welcome.component';
import { NavSideComponent } from '../shared/nav-side/nav-side.component';
import { EmployeesListComponent } from '../componets/employees-list/employees-list.component';
import { EmployeeComponent } from '../componets/employee/employee.component';
import { ErrorcomponetComponent } from '../componets/errorcomponet/errorcomponet.component';
import { AuthGuard } from '../services/AuthGuard';
import { RedirectIfAuthenticatedGuard } from '../services/RedirectIfAuthenticatedGuard';
export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: '',
        component: NavSideComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [RedirectIfAuthenticatedGuard]
            },
            {
                path: 'employees',
                component: EmployeesListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'employees/:id',
                component: EmployeeComponent,
                canActivate: [AuthGuard]
            }
        ],
    },
    {
        path: '**',
        component: ErrorcomponetComponent
    }
];
