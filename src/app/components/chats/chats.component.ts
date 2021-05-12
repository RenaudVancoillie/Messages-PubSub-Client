import { Component, OnInit } from '@angular/core';

import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chat: Chat = {
    id: 1,
    guid: "7F08D5CB-C6DF-4A24-B7E1-CB1E9C0CB320",
    name: "Algemeen"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
