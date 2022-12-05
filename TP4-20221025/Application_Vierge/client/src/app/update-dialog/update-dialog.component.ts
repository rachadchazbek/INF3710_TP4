import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fournisseur, PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  fournisseurs: Fournisseur[];
  updatedForm: FormGroup;
  updatedPlanRepas: PlanRepas;
  initialForm: PlanRepas;
  confirmed: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly controller: ClientControllerService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.data.numeroplan);
    this.controller.getPlanRepas(this.data.numeroplan).subscribe((result: PlanRepas[]) => {
      this.initialForm = new PlanRepas(result[0]);
      this.updatedForm = new FormGroup({
        numeroplan: new FormControl(this.initialForm.numeroplan),
        categorie: new FormControl(this.initialForm.categorie, [Validators.required, Validators.maxLength(20)]),
        frequence: new FormControl(this.initialForm.frequence, [Validators.required, Validators.maxLength(20)]),
        nbrpersonnes: new FormControl(this.initialForm.nbrpersonnes, [Validators.required]),
        nbrcalories: new FormControl(this.initialForm.nbrcalories, [Validators.required]),
        prix: new FormControl(this.initialForm.prix, [Validators.required]),
        numerofournisseur: new FormControl(this.initialForm.numerofournisseur, [Validators.required, Validators.maxLength(4)])
      });
    });
    this.controller.getAllFournisseurs().subscribe((result: Fournisseur[]) => {
      this.fournisseurs = result;
    });
  }
  updatePlanRepas(): void {
    this.updatedPlanRepas = new PlanRepas(this.updatedForm.value);
    console.log(this.updatedPlanRepas);
    try {
      this.controller.updatePlanRepas(this.updatedPlanRepas).subscribe();
      this.dialogRef.close();
      this.openSnackBar("Mise à jour Réussie!", "");
    }
    catch {
      this.dialogRef.close();
      this.openSnackBar("Erreur:", "Veuillez Reessayer de modifier")
    }
  }
  confirm(): void {
    this.confirmed = true;
  }
  close(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000,
    });
  }
};
