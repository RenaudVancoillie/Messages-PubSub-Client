import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

import { Message } from 'src/app/interfaces/messages/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private hub: string = 'https://localhost:44354';
  private hubConnection: signalR.HubConnection;

  public receiveMessageCreatedEvent: Subject<Message>;
  public receiveMessageUpdatedEvent: Subject<Message>;
  public receiveMessageDeletedEvent: Subject<Message>;

  constructor() { 
    this.receiveMessageCreatedEvent = new Subject();
    this.receiveMessageUpdatedEvent = new Subject();
    this.receiveMessageDeletedEvent = new Subject();

    this.connect();
  }

  public connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.hub}/hubs/messages`)
      .build();

    this.hubConnection.on("MessageCreatedEvent", (message: Message) => {
      this.receiveMessageCreatedEvent.next(message);
    });

    this.hubConnection.on("MessageUpdatedEvent", (message: Message) => {
      this.receiveMessageUpdatedEvent.next(message);
    });

    this.hubConnection.on("MessageDeletedEvent", (message: Message) => {
      this.receiveMessageDeletedEvent.next(message);
    })
    
    this.hubConnection.start()
      .then(() => console.log("Connected with the messages hub!"))
      .catch(error => console.error("Error while trying to connect to the messages hub: ", error));
  }

  public disconnect(): void {
    this.hubConnection.stop()
      .then(() => console.log("Disconnected from the messages hub!"))
      .catch(error => console.error("Error while trying to disconnect from the messages hub: ", error));
  }

  public subscribe(channel: string): void {
    console.log(`Subscribed to channel ${channel}!`);
    this.hubConnection.send("Subscribe", channel);
  }

  public unsubscribe(channel: string): void {
    console.log(`Unsubscribed from channel ${channel}!`);
    this.hubConnection.send("Unsubscribe", channel);
  }

  public sendMessage(channel: string, message: any): void {
    this.hubConnection.send("Create", channel, message);
  }

  public updateMessage(channel: string, message: Message): void {
    this.hubConnection.send("Update", channel, message);
  }

  public deleteMessage(channel: string, id: number): void {
    this.hubConnection.send("Delete", channel, id);
  }

}
