import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  loading = true;
  error: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const GET_EMPLOYEE_BY_ID = gql`
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
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: id }
    }).valueChanges.subscribe({
      next: (result: any) => {
        this.employee = result.data.getEmployeeById;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}
