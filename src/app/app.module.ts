import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatsComponent } from './components/chats/list/chats.component';
import { ChatComponent } from './components/chats/details/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
