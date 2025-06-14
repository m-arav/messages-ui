import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageApi } from '../../services/message-api';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
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

  reload(): void {
    this.fetchMessages();
  }

  statusClass(status: string): string {
    switch (status) {
      case 'delivered': return 'is-success';
      case 'pending': return 'is-warning';
      case 'failed': return 'is-danger';
      case 'queued': return 'is-info';
      default: return '';
    }
  }
}