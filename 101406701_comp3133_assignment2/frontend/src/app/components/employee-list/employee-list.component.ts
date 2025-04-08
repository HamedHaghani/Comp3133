import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  loading = true;
  error: any;

  department: string = '';
  designation: string = '';
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects === '/employees') {
          this.ngOnInit(); 
        }
      });
  }
  

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (result) => {
        const data: any = result.data as any;
        this.employees = data.getAllEmployees;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.ngOnInit(); // reload after delete
        },
        error: (err) => {
          alert('Delete failed: ' + err.message);
        }
      });
    }
  }

  search(): void {
    this.loading = true;
    this.employeeService.searchEmployees(this.department, this.designation).subscribe({
      next: (result) => {
        const data: any = result.data as any;
        this.employees = data.searchEmployees;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
