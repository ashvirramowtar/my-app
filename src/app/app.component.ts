import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule  } from "@angular/forms";
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, FormsModule ],
  providers: [ HttpClient ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
