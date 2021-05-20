import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() chatId: number;
  @Input() channel: string;

  name: string = '';
  message: string = '';

  private readonly MAX_SENDER_LENGTH = 24;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { }

  ngOnDestory(): void { }

  public sendMessage() {
    if(this.name.trim().length > 0 && this.name.length <= this.MAX_SENDER_LENGTH) {
      this.messageService.sendMessage(this.channel, {chatId: this.chatId, sender: this.name, text: this.message});
    } else {
      console.error(`Sender name maximum length of ${this.MAX_SENDER_LENGTH} characters exceeded.`);
    }
  }

}
