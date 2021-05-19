import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private hub: string = 'https://localhost:44354';
  private hubConnection: signalR.HubConnection;

  constructor() { }

  public connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.hub}/hubs/messages`)
      .build();
    
    this.hubConnection.start()
      .then(() => console.log("Connected with the messages hub!"))
      .catch(error => console.error("Error while trying to connect to the messages hub: ", error));
  }

  public disconnect(): void {
    this.hubConnection.stop()
      .then(() => console.log("Disconnected from the messages hub!"))
      .catch(error => console.error("Error while trying to disconnect from the messages hub: ", error));
  }

}
