import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Chat } from 'src/app/interfaces/chats/chat';
import { ChatWithMessages } from 'src/app/interfaces/chats/chatWithMessages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url: string = 'https://localhost:44332'

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chat[]> {
    const endpoint = `${this.url}/api/chats`;
    return this.http.get<Chat[]>(endpoint).pipe(
      catchError(this.handleError<Chat[]>(`getChats`, []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
