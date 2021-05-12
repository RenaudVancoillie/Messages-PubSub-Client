import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';
import { CHATS } from 'src/app/data/mock-chats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getChats(): Observable<Chat[]> {
    const chats = of(CHATS);
    return chats;
  }

}
