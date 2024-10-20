import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CombinedNavSideBarComponent } from './shared/combined-Componets/combined-nav-side-bar/combined-nav-side-bar.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './services/authguard';
export const routes: Routes = [
    {        
        path: 'login',
        component: LoginComponent    
    },
    {
        path: '',
        component: CombinedNavSideBarComponent,
        children: [
            {
                path: 'employees',
                component: EmployeeListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'employee',
                component: EmployeeDetailsComponent,
                canActivate: [AuthGuard]
            },   
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];


