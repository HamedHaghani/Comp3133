import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) {}

  getAllEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            _id
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
      `
    }).valueChanges;
  }

  searchEmployees(department?: string, designation?: string) {
    return this.apollo.watchQuery({
      query: gql`
        query SearchEmployees($department: String, $designation: String) {
          searchEmployees(department: $department, designation: $designation) {
            _id
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
      `,
      variables: { department, designation }
    }).valueChanges;
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($eid: ID!) {
          deleteEmployee(eid: $eid) {
            message
          }
        }
      `,
      variables: { eid: id }
    });
  }
  
  
}
