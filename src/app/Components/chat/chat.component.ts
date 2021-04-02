import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/Services/chat/chat.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  users = [];
  userId: any;
  message: string = "";
  receiver: any;
  chatHistory: any[];
  sender = "";
  imageError: any;
  cardImageBase64: any;
  isImageSaved: boolean;
  selectedIndex: number;
  subscriptions:Subscription[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.queryParams.subscribe(x => {
      this.userId = x.userId
    }));

    this.subscriptions.push(this.userService.GetRegisteredUsers().subscribe(data => {
      this.users = data;
      let user = this.users.filter(x => x['id'] == this.userId);
      this.users = this.users.filter(x => x['id'] != this.userId)
      this.sender = user[0]['id'];
    }))
  }

  getChatHistory(sender: string, receiver: string) {
    var chatListSender = this.chatService.getUserMessagesSender(sender, receiver);
    var chatListReceiver = this.chatService.getUserMessagesReceiver(sender, receiver);
    this.subscriptions.push(chatListSender.subscribe(x => {
      this.subscriptions.push(chatListReceiver.subscribe(y => {
        var chatList: any[] = []
        chatList = x.concat(y);
        this.chatHistory = chatList.sort((a, b) => (new Date(a.timeSent) > new Date(b.timeSent) ? 1 : -1));
      }));
    }));
  }

  setCurrentReceiver(userDetail: any, index: number) {
    this.selectedIndex = index;
    this.receiver = userDetail.id;
    this.getChatHistory(this.sender, this.receiver);
  }

  send() {
    this.chatService.sendMessage(this.message, this.sender, this.receiver);
    this.message = "";
  }

  attachFile() {
    let doc = document.getElementById('attachInput');
    doc?.click();
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          this.chatService.sendImage(this.sender, this.receiver, this.cardImageBase64);
          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
