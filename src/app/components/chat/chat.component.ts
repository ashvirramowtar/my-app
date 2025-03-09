import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormsModule  } from "@angular/forms";
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from '../../services/message.service';
import { Validator } from '../../directives/validator';
import { ChatRoom } from '../../models/chat-room';
import { Conversation } from '../../models/conversation';

@Component({
	selector: 'app-chat',
	standalone: false,
	providers: [ MessageService ],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	isLoading: boolean;
	chatRooms: ChatRoom[];
	selectedChatRoom: ChatRoom;
	textMessage: string;
	conversation: Conversation;

	private responses: string[];

	public constructor(private messageService: MessageService) {
		
	}
	
	public ngOnInit(): void {
		this.isLoading = false;

		this.chatRooms = [];
		this.chatRooms.push(new ChatRoom("rick", ["Rick Sanchez"]));
		this.chatRooms.push(new ChatRoom("pap", ["Panic", "Pain"]));
		this.selectedChatRoom = this.chatRooms[0];

		this.textMessage = "";

		this.conversation = new Conversation();
		this.conversation.addPersonMessage("Ashvir", "Hello there.");
		this.conversation.addCharacterMessage("Rick", "Wubba dubba lub lub!")
		this.conversation.addPersonMessage("Ashvir", "How are you?");
		this.conversation.addCharacterMessage("Rick", "I need that ice cream!")

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
			this.clearTextMessage();
	
			this.chat();
		} 
		
		/*this.messageService.send(this.message).subscribe((response: any) => {
			let x = response;
		});*/
	};

	public clearTextMessage(): void {
		this.textMessage = "";
	}
	
	private chat(): void {
		let index = Math.floor(Math.random() * (this.responses.length));
		this.isLoading = true;
		setTimeout(() => {
			this.conversation.addCharacterMessage("Rick", this.responses[index]);
			this.isLoading = false;
		}, 1500);
	}
}
