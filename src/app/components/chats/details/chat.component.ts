import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';
import { Message } from 'src/app/interfaces/messages/Message';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chat?: ChatWithMessages;

  editing: boolean = false;
  editingId: number = -1;

  private updatedMessageSubscription: Subscription;
  private deletedMessageSubscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void { 
    this.updatedMessageSubscription = this.messageService.receiveMessageUpdatedEvent.subscribe((message: Message) => {
      if(this.chat !== null && this.chat.id === message.chatId) {
        let index = this.chat.messages.findIndex(m => m.id === message.id);
        this.chat.messages[index] = message;
      }
    });

    this.deletedMessageSubscription = this.messageService.receiveMessageDeletedEvent.subscribe((message: Message) => {
      if(this.chat !== null && this.chat.id === message.chatId) {
        let index = this.chat.messages.findIndex(m => m.id === message.id);
        this.chat.messages.splice(index, 1);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chat = changes.chat.currentValue;
  }

  ngOnDestroy(): void {
    this.updatedMessageSubscription.unsubscribe();
    this.deletedMessageSubscription.unsubscribe();
  }

  public startEditing(message: Message) {
    this.editingId = message.id;
    this.editing = true;
  }

  public updateMessage(message: Message) {
    this.messageService.updateMessage(this.chat.guid, message);
    this.editing = false;
    this.editingId = -1;
  }

  public deleteMessage(message: Message) {
    this.messageService.deleteMessage(this.chat.guid, message.id);
  }

}
