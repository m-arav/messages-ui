import { Component, inject, signal } from '@angular/core';
import { MessageApi } from '../../services/message-api';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss'
})
export class MessageList {
  private messageApi = inject(MessageApi);

  messages = signal<any[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.messageApi.getMessages().subscribe({
      next: (data) => {
        this.messages.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load messages');
        this.loading.set(false);
      }
    });
  }
}