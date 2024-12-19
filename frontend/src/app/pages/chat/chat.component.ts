import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  imports: [NgFor, FormsModule, NavbarComponent, FooterComponent, NgClass, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @ViewChild('chatBody') chatBody!: ElementRef;  // Referencia al contenedor del chat
  message: string = '';
  messages: { text: string; userName: string; isOwn: boolean }[] = [];
  userName: string = '';

  constructor(private chatService: ChatService, private cookieService: CookieService) {
    this.userName = this.cookieService.get('user_name');

    // Escucha los mensajes del servidor
    this.chatService.getMessages().subscribe((msg: { userName: string; message: string }) => {
      const isOwn = msg.userName === this.userName; 
      this.messages.push({ text: msg.message, userName: msg.userName, isOwn });
      this.scrollToBottom(); // Llamamos a la función para desplazar hacia abajo después de recibir un mensaje
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom(); // Desplazarse hacia abajo cada vez que la vista cambie
  }

  scrollToBottom() {
    // Solo desplazamos si tenemos la referencia al chatBody
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message);
      this.message = ''; 
    }
  }
}
