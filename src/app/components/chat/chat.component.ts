import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { Validator } from '../../directives/validator';
import { Conversation } from '../../models/conversation';
import { Router } from '@angular/router';
import { CHARACTER, TOKEN } from '../../helpers/constants';
import { UserDetail } from '../../models/user-detail';
import { CharacterDetail } from '../../models/character-detail';

@Component({
	selector: 'app-chat',
	standalone: false,
	providers: [ MessageService, AuthService ],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	isTyping: boolean;
	isLoggingOut: boolean;

	textMessage: string;
	conversation: Conversation;
	character: CharacterDetail;
	user: UserDetail;

	public constructor(private messageService: MessageService, private authService: AuthService, private router: Router) {
		
	}
	
	public ngOnInit(): void {
		this.isTyping = false;
		this.isLoggingOut = false;
		this.textMessage = "";
		this.conversation = new Conversation();

		this.authService.getUserDetail().subscribe({
			next: (response => {
				this.user = response;
				this.character = CHARACTER(response.character);
			}),
			error: (error => {
				console.log("Error :", error);
			})
		 });
	}
	
	public sendTextMessage(): void {
		if (Validator.hasValue(this.textMessage)) {
			this.conversation.addPersonMessage(this.user.firstName, this.textMessage)
			this.isTyping = true;

			let copyOfMessage = this.textMessage;
			this.clearTextMessage();

			this.messageService.sendText(this.user.character, copyOfMessage).subscribe({
				next: (response => {
					let characterMessage = response.response;
					let characterName = CHARACTER(this.user.character).name!; //Needs to come from response.response
					this.conversation.addCharacterMessage(characterName, characterMessage);
					this.isTyping = false;
				}),
				error: ((error) => {
					console.log("Error :", error);
					this.isTyping = false;
				})
			 })
		}
	};

	public clearTextMessage(): void {
		this.textMessage = "";
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
			this.authService.logOut();
            this.isLoggingOut = false;
            this.router.navigate(["login"])
        }, 500);
	}
}
