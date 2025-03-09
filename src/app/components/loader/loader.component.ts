import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-loader',
	standalone: false,
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {
	@Input() characterName: string;
	
	public ngOnInit(): void {
		
	}

	constructor() {
		
	}
}
