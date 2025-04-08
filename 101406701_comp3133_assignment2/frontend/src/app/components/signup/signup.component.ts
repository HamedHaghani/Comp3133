import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  signup() {
    const SIGNUP_MUTATION = gql`
      mutation Signup($input: SignupInput!) {
        signup(input: $input) {
          message
          user {
            _id
            username
            email
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        input: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      }
    }).subscribe({
      next: (result: any) => {
        localStorage.setItem('user', JSON.stringify(result.data.signup.user));
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.message || 'Signup failed';
      }
    });
  }
}
