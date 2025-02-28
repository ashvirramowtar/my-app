import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule  } from "@angular/forms";
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from '../../services/message.service';

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

	public constructor(private messageService: MessageService) {

	}
	
	public ngOnInit(): void {
		this.isLoading = false;
		this.message = "";
		this.texts = [];
	}
	
	public sendMessage(): void {
		this.texts.push(this.message);
		this.clearMessage();

		this.messageService.send(this.message).subscribe((response: any) => {
			let x = response;
		});
	};

	public clearMessage(): void {
		this.message = "";
	}
}
