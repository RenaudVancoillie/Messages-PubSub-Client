import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() chatId?: number;
  @Input() channel?: string;

  name: string = '';
  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public sendMessage() {
    console.log(`Message has been sent to ${this.channel} (${this.name}: ${this.message})`);
  }

}
