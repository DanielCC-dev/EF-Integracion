import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private chatSubject = new Subject<{ userName: string; message: string }>();

  constructor(private cookieService: CookieService) {
    console.log('Conectando a Socket.io...');
    this.socket = io('http://localhost:2500');

    this.socket.on('connect', () => {
      console.log('Conexión establecida con el servidor');
    });

    this.listenToMessages();
  }

  sendMessage(message: string) {
    const userName = this.cookieService.get('user_name'); // Obtener el usuario desde la cookie
    const payload = { userName, message };
    this.socket.emit('chatMessage', payload); // Emitir mensaje con usuario
  }

  listenToMessages() {
    this.socket.on('chatMessage', (payload: { userName: string; message: string }) => {
      console.log('Mensaje recibido desde el servidor:', payload);
      this.chatSubject.next(payload); // Emitir mensaje recibido
    });
  }

  getMessages() {
    return this.chatSubject.asObservable();
  }
}
