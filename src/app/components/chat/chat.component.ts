import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule  } from "@angular/forms";
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from '../../services/message.service';
import { Validator } from '../../directives/validator';

@Component({
	selector: 'app-chat',
	imports: [ CommonModule, FormsModule, LoaderComponent ],
	providers: [ MessageService ],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	public isLoading: boolean;
	public message: string;
	public texts: string[];
	private responses: string[];

	public constructor(private messageService: MessageService) {

	}
	
	public ngOnInit(): void {
		this.isLoading = false;
		this.message = "";
		this.texts = [];

		this.responses = [
			"the fock u said to me??",
			"i don't understand",
			"i dunno",
			"what??"
		]
	}
	
	public sendMessage(): void {
		if (Validator.hasValue(this.message)) {
			this.texts.push(this.message);
			this.clearMessage();
	
			this.chat();
		} 
		
		/*this.messageService.send(this.message).subscribe((response: any) => {
			let x = response;
		});*/
	};

	public clearMessage(): void {
		this.message = "";
	}
	
	private chat(): void {
		let index = Math.floor(Math.random() * (this.responses.length));
		this.isLoading = true;
		setTimeout(() => {
			this.texts.push( this.responses[index]);
			this.isLoading = false;
		}, 1500);
	}
}
