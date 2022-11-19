import { Component, OnInit } from '@angular/core';
import { PlanRepas } from 'src/interfaces/planrepas';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit {

  constructor(privatye readonly controller: ClientControllerService) { }

  ngOnInit(): void {
  }
  add(planRepas: PlanRepas)
  {
    try{
      this.controller.addPlanrepas(planRepas);
    }
    catch{}
  }
  update(planRepas:PlanRepas)
  {
    try{
      this.controller.updatePlanRepas(planRepas);
    }
    catch{}
  }
  delete()
  {
    try{
      this.controller.deletePlanrepas(1000);
    }
    catch{}
  }

}
