import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chatId?: number;

  chat?: Chat;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chatId = changes.chatId.currentValue;
    console.log(this.chatId);
  }

}
