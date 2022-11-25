import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ClientControllerService } from '../services/client-controller.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit {
  
  constructor(private readonly controller: ClientControllerService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['numéroplan','catégorie','fréquence','nbrcalories','nbrpersonnes','numérofournisseur','prix','action'];
  allPlanRepas: PlanRepas[] = [];
  ngOnInit(): void {
    try{
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
      this.dialog.open(AddDialogComponent, {
        width: '350px',
      });
      this.controller.addPlanrepas(planRepas);
    }
    catch{}
  }
  update(numeroplan: string)
  {
    try{
      let addDialog = this.dialog.open(UpdateDialogComponent, {
        width: '350px',
        data: {numeroplan: 'P001'}
      });
      addDialog.afterClosed().subscribe((result)=>{alert(result)});
      this.controller.updatePlanRepas({} as PlanRepas);
    }
    catch{}
  }
  delete()
  {
    try{
      this.dialog.open(DeleteDialogComponent, {
        data: { numeroPlan: 1000 },
        width: '350px'
      });
      this.controller.deletePlanrepas(1000);
    }
    catch{}
  }
}
