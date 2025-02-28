import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule  } from "@angular/forms";
import { LoaderComponent } from '../loader/loader.component';

@Component({
	selector: 'app-chat',
	imports: [ CommonModule, FormsModule, LoaderComponent ],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	public isLoading: boolean;
	public message: string;
	public texts: string[];
	
	public ngOnInit(): void {
		this.isLoading = false;
		this.message = "";
		this.texts = ["first message", "second message"];
	}
	
	public sendMessage(): void {
		this.message = "";
	};
}
