import { Component, OnInit } from '@angular/core';

import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat: ChatWithMessages = {
    "id": 8,
    "guid": "07E52FF0-A2A0-4B91-85AF-77568FCA1C0C",
    "name": "Muziek",
    "messages": [
        {
            "id": 3,
            "chatId": 8,
            "sender": "Thomas",
            "text": "Carry On Wayward Son",
            "createdAt": "2021-05-12T16:20:49.75",
            "updatedAt": null,
            "deletedAt": null
        },
        {
            "id": 4,
            "chatId": 8,
            "sender": "Thomas",
            "text": "The Trooper",
            "createdAt": "2021-05-12T16:21:05.45",
            "updatedAt": null,
            "deletedAt": null
        },
        {
            "id": 5,
            "chatId": 8,
            "sender": "Jonathan",
            "text": "Rockin' in the Free World",
            "createdAt": "2021-05-12T16:21:38.83",
            "updatedAt": null,
            "deletedAt": null
        }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
