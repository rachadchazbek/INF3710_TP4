import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToGithub() {
    window.open("https://github.com/rachadchazbek/INF3710_TP4", '_blank');
  }
}
