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

  public receiveMessage: Subject<Message>;

  constructor() { 
    this.receiveMessage = new Subject();
  }

  public connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.hub}/hubs/messages`)
      .build();

    this.hubConnection.on("MessageCreatedEvent", (message: Message) => {
      console.log("MessageCreatedEvent");
      this.receiveMessage.next(message);
    });
    
    this.hubConnection.start()
      .then(() => console.log("Connected with the messages hub!"))
      .catch(error => console.error("Error while trying to connect to the messages hub: ", error));
  }

  public disconnect(): void {
    this.hubConnection.stop()
      .then(() => console.log("Disconnected from the messages hub!"))
      .catch(error => console.error("Error while trying to disconnect from the messages hub: ", error));
  }

  public sendMessage(channel: string, message: any): void {
    this.hubConnection.send("Create", channel, message);
  }

}
