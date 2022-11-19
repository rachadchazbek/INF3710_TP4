import { Component, OnInit } from '@angular/core';
import { PlanRepas } from 'src/interfaces/planrepas';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit {
  
  constructor(private readonly controller: ClientControllerService) { }
  allPlanRepas: PlanRepas[] = [];
  ngOnInit(): void {
    try{
    console.log("jj");
    this.controller.getAllPlanRepas().subscribe((allPlanRepas)=>{
      this.allPlanRepas = allPlanRepas;
      console.log(this.allPlanRepas);
    })
    }
    catch{}
  }
  add(planRepas: PlanRepas)
  {
    try{
      this.controller.addPlanrepas(planRepas);
    }
    catch{}
  }
  update()
  {
    try{
      this.controller.updatePlanRepas({} as PlanRepas);
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
