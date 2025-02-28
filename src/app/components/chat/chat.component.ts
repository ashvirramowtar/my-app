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
	public message: string;
	public messages: string[];
	
	public ngOnInit(): void {
		this.message = "";
		this.messages = [];
	}
	
	public sendMessage(): void {
		this.message = "";
	};
}
