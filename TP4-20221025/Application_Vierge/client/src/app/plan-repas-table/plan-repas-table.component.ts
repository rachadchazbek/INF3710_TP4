import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DialogComponent } from '../components/dialog/dialog.component';

import { ClientControllerService } from '../services/client-controller.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


const DELETE_CONFIRMATION_MESSAGE = 'Est ce que vous êtes sure de modifier?';
@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit {
  
  constructor(private readonly controller: ClientControllerService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['numeroplan','categorie','frequence','nbrcalories','nbrpersonnes','numerofournisseur','prix','action'];
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
        data: {numeroplan: numeroplan}
      });
      addDialog.afterClosed().subscribe((result)=>{alert(result)});
      this.controller.updatePlanRepas({} as PlanRepas);
    }
    catch{}
  }
  delete(numeroplan: string)
  {
    try{
      const deleteDialog = this.dialog.open(DialogComponent, {
        data:{
          message: DELETE_CONFIRMATION_MESSAGE ,
          buttonText: {
            ok: ' Oui',
            cancel: 'Non'
          }
        },
        width: '350px'
      });
      deleteDialog.afterClosed().subscribe((confirmed: boolean) => {
      });
      this.controller.deletePlanrepas(numeroplan);
    }
    catch{}
  }
}
