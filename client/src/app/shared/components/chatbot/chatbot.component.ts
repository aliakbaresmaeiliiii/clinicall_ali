import { Component, inject } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  chatBotService = inject(ChatbotService);

  userMessage: string = '';
  chatHistory: { role: string; content: string }[] = [];

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.chatHistory.push({ role: 'user', content: this.userMessage });

    this.chatBotService.sendMessageToBot(this.userMessage).subscribe(
      (res: any) => {
        this.chatHistory.push({ role: 'bot', content: res.reply });
      },
      (error) => {
        console.error('Error:', error);
        this.chatHistory.push({ role: 'bot', content: 'Sorry, something went wrong.' });
      }
    );

    this.userMessage = ''; // Clear input field
  }
}
