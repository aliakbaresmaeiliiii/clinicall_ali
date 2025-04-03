import { Component, inject } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  animations: [
    trigger('chatAnimation', [
      state('closed', style({ 
        transform: 'scale(0.2)', 
        opacity: 0, 
        transformOrigin: 'bottom left', 
        display: 'none' 
      })),
      state('open', style({ 
        transform: 'scale(1)', 
        opacity: 1, 
        transformOrigin: 'bottom left', 
        display: 'block' 
      })),
      transition('closed => open', [
        style({ display: 'block' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('open => closed', [
        animate('300ms ease-in', style({ transform: 'scale(0.2)', opacity: 0 })),
        style({ display: 'none' })
      ])
    ])
  ]
})
export class ChatbotComponent {
  chatBotService = inject(ChatbotService);
  isChatbotOpen = false;
  userMessage: string = '';
  chatHistory: { role: string; content: string }[] = [];

  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }
  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.chatHistory.push({ role: 'user', content: this.userMessage });

    this.chatBotService.sendMessageToBot(this.userMessage).subscribe({
      next: res => {
        this.chatHistory.push({ role: 'bot', content: res.reply });
      },
      error: error => {
        console.error('Error:', error);
        this.chatHistory.push({
          role: 'bot',
          content: 'Sorry, something went wrong.',
        });
      },
    });

    this.userMessage = ''; // Clear input field
  }
}
