import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';
import { Message } from 'src/app/interfaces/messages/Message';

import { ChatService } from 'src/app/services/chats/chat.service';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  private createdChatSubscription: Subscription;
  
  private createdMessageSubscription: Subscription;
  private updatedMessageSubscription: Subscription;
  private deletedMessageSubscription: Subscription;

  chats: Chat[] = [];

  selectedChat?: ChatWithMessages;
  
  name: string = '';

  constructor(private chatService: ChatService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.chatService.connect();

    this.createdChatSubscription = this.chatService.receiveChat.subscribe((chat: Chat) => {
      this.chats.unshift(chat);
      this.chatService.getChat(chat.id).subscribe((chatWithMessages: ChatWithMessages) => this.selectedChat = chatWithMessages);
    });

    this.createdMessageSubscription = this.messageService.receiveMessageCreatedEvent.subscribe((message: Message) => {
      console.log("receiveMessageCreatedEvent");  // TODO: remove log!
      if(this.selectedChat !== null && this.selectedChat.id === message.chatId) {
        this.selectedChat.messages.push(message);
      }
    });

    this.updatedMessageSubscription = this.messageService.receiveMessageUpdatedEvent.subscribe((message: Message) => {
      console.log("receiveMessageUpdatedEvent");  // TODO: remove log!
      if(this.selectedChat !== null && this.selectedChat.id === message.chatId) {
        let index = this.selectedChat.messages.findIndex(m => m.id === message.id);
        this.selectedChat.messages[index] = message;
      }
    });

    this.deletedMessageSubscription = this.messageService.receiveMessageDeletedEvent.subscribe((message: Message) => {
      console.log("receiveMessageDeletedEvent");  // TODO: remove log!
      if(this.selectedChat !== null && this.selectedChat.id === message.chatId) {
        this.selectedChat.messages.filter(m => m.id === message.id).pop();
      }
    });

    this.getChats();
  }

  ngOnDestroy(): void {
    this.createdChatSubscription.unsubscribe();
    
    this.createdMessageSubscription.unsubscribe();
    this.updatedMessageSubscription.unsubscribe();
    this.deletedMessageSubscription.unsubscribe();
    
    this.chatService.disconnect();
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
