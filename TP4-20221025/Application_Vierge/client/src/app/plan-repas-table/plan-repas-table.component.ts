import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DialogComponent } from '../components/dialog/dialog.component';

import { ClientControllerService } from '../services/client-controller.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


const DELETE_CONFIRMATION_MESSAGE = 'Est ce que vous êtes sure de supprimer?';
@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit {

  constructor(private readonly controller: ClientControllerService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['numeroplan', 'categorie', 'frequence', 'nbrcalories', 'nbrpersonnes', 'numerofournisseur', 'prix', 'action'];
  allPlanRepas: PlanRepas[] = [];
  ngOnInit(): void {
    try {
      this.controller.getAllPlanRepas().subscribe((allPlanRepas) => {
        this.allPlanRepas = allPlanRepas;
        console.log(this.allPlanRepas);
      })
    }
    catch { }
  }
  add(planRepas: PlanRepas) {
    try {
      this.dialog.open(AddDialogComponent, {
        width: '350px',
      });
      this.controller.addPlanrepas(planRepas);
      this.ngOnInit();
    }

    catch { }
  }
  update(numeroplan: string) {
    try {
      let updateDialog = this.dialog.open(UpdateDialogComponent, {
        width: '350px',
        data: { numeroplan: numeroplan }
      });
      updateDialog.afterClosed().subscribe((result) => { alert(result) });
    }
    catch { }
    this.ngOnInit();
  }
  delete(numeroplan: string) {
    try {
      const deleteDialog = this.dialog.open(DialogComponent, {
        data: {
          numeroplan: numeroplan,
          message: DELETE_CONFIRMATION_MESSAGE,
          buttonText: {
            ok: ' Oui',
            cancel: 'Non'
          }
        },
        width: '350px'
      });
      deleteDialog.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.controller.deletePlanrepas(numeroplan);
          this.ngOnInit();
        }
      });

    }
    catch { }
  }
}
