import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

 ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const emailFromUrl = params['email'];
      if (emailFromUrl) {
        this.email =  emailFromUrl
      }
    });
  }

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => alert('Login failed')
    });
  }
}
