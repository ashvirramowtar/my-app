import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormsModule  } from "@angular/forms";
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from '../../services/message.service';
import { Validator } from '../../directives/validator';
import { ChatRoom } from '../../models/chat-room';
import { Conversation } from '../../models/conversation';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
//import { TextMessageResponse } from '../../models/api/text-message-response';

@Component({
	selector: 'app-chat',
	standalone: false,
	providers: [ MessageService ],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	isTyping: boolean;
	isLoggingOut: boolean;

	chatRooms: ChatRoom[];
	selectedChatRoom: ChatRoom;
	textMessage: string;
	conversation: Conversation;

	private responses: string[];

	public constructor(private messageService: MessageService, private router: Router) {
		
	}
	
	public ngOnInit(): void {
		this.isTyping = false;
		this.isLoggingOut = false;

		this.chatRooms = [];
		this.chatRooms.push(new ChatRoom("rick", ["Rick Sanchez"]));
		this.chatRooms.push(new ChatRoom("pap", ["Panic", "Pain"]));
		this.selectedChatRoom = this.chatRooms[0];

		this.textMessage = "";

		this.conversation = new Conversation();

		this.responses = [
			"the fock u said to me??",
			"i don't understand",
			"i dunno",
			"what??"
		]
	}
	
	public sendTextMessage(): void {
		if (Validator.hasValue(this.textMessage)) {
			this.conversation.addPersonMessage("Ashvir", this.textMessage)
			this.isTyping = true;

			/*this.messageService.sendText("rick", this.textMessage).subscribe((response: any) => {
				let x = response;
				this.isTyping = false;
				this.clearTextMessage();
			}, (error: HttpErrorResponse) => {
				console.log("Error :", error);
				this.isTyping = false;
			});*/

			this.messageService.sendText("rick", this.textMessage).subscribe({
				next: this.handleResponse.bind(this),
				error: this.handleError.bind(this)
			 })
		}
	};

	private handleResponse(response: any): void {
		let x = response;
		this.isTyping = false;
		this.clearTextMessage();
	}

	private handleError(error: HttpErrorResponse): void {
		console.log("Error :", error);
		this.isTyping = false;
	}

	public clearTextMessage(): void {
		this.textMessage = "";
	}
	
	private chat(): void {
		let index = Math.floor(Math.random() * (this.responses.length));
		this.isTyping = true;
		setTimeout(() => {
			this.conversation.addCharacterMessage("Rick", this.responses[index]);
			this.isTyping = false;
		}, 1500);
	}

	private scrollDown(): void {
		const element = document.getElementById("chatWindow")!;
		element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		element.scrollTop = element.scrollHeight;
		//element.animate({ scrollTop: element.scrollHeight, }, 1500);
	}

	public ngAfterViewChecked(): void {
		this.scrollDown();
	}

	public logOut(): void {
		this.isLoggingOut = true;
        setTimeout(() => { 
            this.isLoggingOut = false;
            this.router.navigate(["login"])
        }, 1000);
	}
}
