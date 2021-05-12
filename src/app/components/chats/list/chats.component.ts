import { Component, OnInit } from '@angular/core';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chats: Chat[] = [];

  selectedChat?: Chat;
  
  name?: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getChats();
  }

  onSelect(chat: Chat): void {
    this.selectedChat = chat;
  }

  getChats(): void {
    this.chatService.getChats()
      .subscribe(chats => this.chats = chats);
  }

  createChat(): void {
    console.log(this.name);
  }

}
