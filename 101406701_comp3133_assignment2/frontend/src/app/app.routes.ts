import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'; 
import { AuthGuard } from './guards/auth.guard';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
  ,
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent }
]