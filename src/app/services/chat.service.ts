import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalR';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url: string = 'https://localhost:44332';
  private hub: string = 'https://localhost:44354';
  private hubConnection: signalR.HubConnection;

  public receiveChat: Subject<Chat>;

  constructor(private http: HttpClient) { 
    this.receiveChat = new Subject();
  }

  public connect(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${this.hub}/hubs/chat`)
      .build();
    
    this.hubConnection.on("ChatCreatedEvent", (chat: Chat) => {
      this.receiveChat.next(chat);
    });

    this.hubConnection.start()
      .then(() => console.log("Connected with the chat hub!"))
      .catch(error => console.error("Error while trying to connect to the app hub: ", error));
  }

  public disconnect(): void {
    this.hubConnection.stop();
  }

  public getChats(): Observable<Chat[]> {
    const endpoint = `${this.url}/api/chats`;
    return this.http.get<Chat[]>(endpoint).pipe(
      catchError(this.handleError<Chat[]>(`getChats`, []))
    );
  }

  public getChat(id: number): Observable<ChatWithMessages> {
    const endpoint = `${this.url}/api/chats/${id}`;
    return this.http.get<ChatWithMessages>(endpoint).pipe(
      catchError(this.handleError<ChatWithMessages>(`getChat id=${id}`))
    );
  }

  public createChat(name: string): void {
    this.hubConnection.send("CreateChat", {name: name});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
