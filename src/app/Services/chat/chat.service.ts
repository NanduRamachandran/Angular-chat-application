import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<any>;
  userName: Observable<string>;
  items: Observable<any[]>;
  itemsSender: Observable<unknown[]>;
  itemsReceiver: Observable<unknown[]>;

  constructor(
    private db: AngularFireDatabase
    ) {}

  getUserMessagesSender(sender:string, receiver:string) {
    this.items = this.db.list('/messages').valueChanges();
    return this.db.list('/messages', ref => (
      ref.orderByChild('chatId').equalTo(`${sender}_${receiver}`)
    )).valueChanges();
  }

  getUserMessagesReceiver(sender:string, receiver:string) {
    this.items = this.db.list('/messages').valueChanges();
    return this.db.list('/messages', ref => (
      ref.orderByChild('chatId').equalTo(`${receiver}_${sender}`)
    )).valueChanges()
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string, sender:string, receiver:string) {
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();

    this.chatMessages.push({
      isImage: false,
      message: msg,
      timeSent: timestamp,
      senderId: sender,
      receiverId: receiver,
      chatId: `${sender}_${receiver}`
    });
  }

  getMessages(): AngularFireList<any[]> {
    return this.db.list('/messages', ref => {
      return ref.limitToLast(1)
    });
  }

  sendImage(sender: string, receiver: any, cardImageBase64: any) {
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      isImage: true,
      message: cardImageBase64,
      timeSent: timestamp,
      senderId: sender,
      receiverId: receiver,
      chatId: `${sender}_${receiver}`
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}