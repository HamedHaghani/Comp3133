import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: any = {};
  id: string = '';
  message = '';
  error = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    const GET_EMPLOYEE = gql`
      query GetEmployeeById($eid: ID!) {
        getEmployeeById(eid: $eid) {
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;

    this.apollo.watchQuery({
      query: GET_EMPLOYEE,
      variables: { eid: this.id }
    }).valueChanges.subscribe({
      next: (result: any) => {
        this.employee.date_of_joining = this.employee.date_of_joining?.substring(0, 10);
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  updateEmployee() {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee($eid: ID!, $input: EmployeeInput!) {
        updateEmployee(eid: $eid, input: $input) {
          message
          employee {
            _id
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        eid: this.id,
        input: {
          ...this.employee,
          date_of_joining: new Date(this.employee.date_of_joining).toISOString()
        }
      }
    }).subscribe({
      next: () => {
        this.message = 'Employee updated successfully!';
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}

