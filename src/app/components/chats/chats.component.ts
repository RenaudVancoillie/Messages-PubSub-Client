import { Component, OnInit } from '@angular/core';

import { Chat } from 'src/app/interfaces/chat';
import { CHATS } from '../../data/mock-chats';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chats = CHATS;

  selectedChat?: Chat;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(chat: Chat): void {
    this.selectedChat = chat;
  }

}
