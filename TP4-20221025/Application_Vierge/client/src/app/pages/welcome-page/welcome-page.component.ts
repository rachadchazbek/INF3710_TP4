import { Component, OnInit } from '@angular/core';
import { ClientControllerService } from 'src/app/services/client-controller.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private readonly controller: ClientControllerService) { }

  ngOnInit(): void {
  }
  getAllPlanRepas(){
    try{
    this.controller.getAllPlanRepas();
    }
    catch{};
  }
}
