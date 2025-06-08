import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { MessageApi } from '../../services/message-api';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.html',
  styleUrl: './message-form.scss'
})
export class MessageForm {
  @Output() submitted = new EventEmitter<void>();

  private messageApi = inject(MessageApi);
  private fb = inject(FormBuilder);

  isSubmitting = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  messageForm: FormGroup = this.fb.group({
    to: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    body: ['', [Validators.required, Validators.minLength(1)]]
  });

  onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.messageForm.valid) {
      this.isSubmitting.set(true);
      const formData = this.messageForm.value;
      
      this.messageApi.createMessages(formData).subscribe({
        next: (response) => {
          this.submitted.emit();
          this.isSubmitting.set(false);
          this.successMessage.set('Message sent successfully!');
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Failed to send message. Please try again.');
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.messageForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.messageForm.reset();
  }
}
