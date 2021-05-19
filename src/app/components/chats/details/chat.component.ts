import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chat?: ChatWithMessages;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chat = changes.chat.currentValue;
  }

}
