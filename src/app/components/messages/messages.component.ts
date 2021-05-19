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

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.connect();
  }

  ngOnDestory(): void {
    this.messageService.disconnect();
  }

  public sendMessage() {
    this.messageService.sendMessage(this.channel, {chatId: this.chatId, sender: this.name, text: this.message});
  }

  // TODO: add updateMessage and deleteMessage

}
