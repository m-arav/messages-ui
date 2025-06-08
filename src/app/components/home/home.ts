import { Component } from '@angular/core';
import { AuthService } from '../../auth';
import { MessageList } from '../message-list/message-list';
import { MessageForm } from "../message-form/message-form";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MessageList, MessageForm],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout()?.subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Logout failed')
    });
  }
}
