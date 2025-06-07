import { Component } from '@angular/core';
import { MessageList } from './components/message-list/message-list';
import { MessageForm } from "./components/message-form/message-form";

@Component({
  selector: 'app-root',
  imports: [MessageList, MessageForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {}
