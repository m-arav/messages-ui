import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.auth.signup(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Signup failed')
    });
  }
}
