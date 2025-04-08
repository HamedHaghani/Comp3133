import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  login() {
    const LOGIN_MUTATION = gql`
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          message
          user {
            _id
            username
          }
        }
      }
    `;

    this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          username: this.username,
          password: this.password
        }
      }
    }).subscribe({
      next: (result: any) => {
        localStorage.setItem('user', JSON.stringify(result.data.login.user));
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.message || 'Login failed';
      }
    });
  }
}
