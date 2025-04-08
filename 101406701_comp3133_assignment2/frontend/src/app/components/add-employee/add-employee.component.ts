import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  first_name = '';
  last_name = '';
  email = '';
  gender = 'Male';
  designation = '';
  salary: number = 1000;
  date_of_joining = '';
  department = '';
  employee_photo = '';
  message = '';
  error = '';

  constructor(private apollo: Apollo, private router: Router) {}

  addEmployee() {
    const ADD_EMPLOYEE_MUTATION = gql`
      mutation AddEmployee($input: EmployeeInput!) {
        addEmployee(input: $input) {
          message
          employee {
            _id
            first_name
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: ADD_EMPLOYEE_MUTATION,
      variables: {
        input: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          gender: this.gender,
          designation: this.designation,
          salary: this.salary,
          date_of_joining: new Date(this.date_of_joining).toISOString(),
          department: this.department,
          employee_photo: this.employee_photo
        }
      }
      
    }).subscribe({
      next: (result: any) => {
        this.message = result.data.addEmployee.message;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.message || 'Error adding employee';
      }
    });
  }
}
