import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';
import { ChatService } from 'src/app/services/chats/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  private createdChatSubscription: Subscription;

  chats: Chat[] = [];

  selectedChat?: ChatWithMessages;
  
  name: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.connect();

    this.createdChatSubscription = this.chatService.receiveChat.subscribe((chat: Chat) => {
      this.chats.push(chat);
      this.chatService.getChat(chat.id).subscribe((chatWithMessages: ChatWithMessages) => this.selectedChat = chatWithMessages);
    });

    this.getChats();
  }

  ngOnDestroy(): void {
    this.createdChatSubscription.unsubscribe();
  }

  onSelect(chat: Chat): void {
    if (this.selectedChat) {
      this.chatService.unsubscribe(chat.guid);
    }
    this.chatService.subscribe(chat.guid);  // WARN: ENSURE UNIQUENESS OF GROUP NAMES
    this.chatService.getChat(chat.id).subscribe((chatWithMessages: ChatWithMessages) => this.selectedChat = chatWithMessages);
  }

  getChats(): void {
    this.chatService.getChats()
      .subscribe(chats => this.chats = chats);
  }

  createChat(): void {
    this.chatService.createChat(this.name); // WARN: INPUT VALIDATION
  }

}
