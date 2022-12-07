import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ClientControllerService } from '../services/client-controller.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

const DELETE_CONFIRMATION_MESSAGE = 'Est ce que vous êtes sure de supprimer le plan repas ';

@Component({
  selector: 'app-plan-repas-table',
  templateUrl: './plan-repas-table.component.html',
  styleUrls: ['./plan-repas-table.component.css']
})
export class PlanRepasTableComponent implements OnInit, AfterViewInit {

  constructor(private readonly controller: ClientControllerService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
  }
  displayedColumns: string[] = ['numeroplan', 'categorie', 'frequence', 'nbrcalories', 'nbrpersonnes', 'numerofournisseur', 'prix', 'action'];
  allPlanRepas: PlanRepas[] = [];
  dataSource: MatTableDataSource<PlanRepas> = new MatTableDataSource(this.allPlanRepas);
  dialogOpen: boolean = false;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  ngOnInit(): void {
    this.dialogOpen = false;
    try {
      this.controller.getAllPlanRepas().subscribe((allPlanRepas) => {
        this.allPlanRepas = allPlanRepas;
        this.dataSource.data = allPlanRepas;
      });
    }
    catch { }
  }

  ngAfterViewInit() {
    this.dataSource.data = this.allPlanRepas;
  }


  add() {
    if (this.dialogOpen) return;
    this.dialogOpen = true;
    try {
      let addDialog = this.dialog.open(AddDialogComponent, {
        width: '420px',
      });
      addDialog.afterClosed().subscribe(() => { this.ngOnInit() });
    }
    catch {
      this.dialogOpen = false;
    }
  }
  update(numeroplan: string) {
    if (this.dialogOpen) return;
    this.dialogOpen = true;
    try {
      this.dialogOpen = true;
      let updateDialog = this.dialog.open(UpdateDialogComponent, {
        width: '420px',
        data: { numeroplan: numeroplan },
      });
      updateDialog.afterClosed().subscribe(() => {
        this.ngOnInit();
        this.dialogOpen = false;
      });
    }
    catch {
      this.dialogOpen = false;
    }

  }
  delete(numeroplan: string) {
    if (this.dialogOpen) return;
    this.dialogOpen = true;
    try {
      const deleteDialog = this.dialog.open(DialogComponent, {
        data: {
          numeroplan: numeroplan,
          message: DELETE_CONFIRMATION_MESSAGE + numeroplan + ' ?',
          buttonText: {
            ok: ' Oui',
            cancel: 'Non'
          }
        },
        width: '420px'
      });
      deleteDialog.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.controller.deletePlanrepas(numeroplan);
          this.ngOnInit();
          this.dialogOpen = false;
        }
      });
    }
    catch {

    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToGithub() {
    window.open("https://github.com/rachadchazbek/INF3710_TP4", '_blank');
  }
}
