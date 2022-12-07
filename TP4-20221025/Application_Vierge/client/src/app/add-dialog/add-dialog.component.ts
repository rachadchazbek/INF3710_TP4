import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fournisseur, PlanRepas } from 'src/interfaces/planrepas';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  fournisseurs: Fournisseur[];
  addForm: FormGroup;
  numeroPlan: string;
  newPlanRepas: PlanRepas;
  confirmed: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, private readonly controller: ClientControllerService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      numeroplan: new FormControl(""),
      categorie: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      frequence: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      nbrpersonnes: new FormControl([Validators.required]),
      nbrcalories: new FormControl([Validators.required]),
      prix: new FormControl([Validators.required]),
      numerofournisseur: new FormControl("", [Validators.required, Validators.maxLength(4)])
    });
    this.controller.getAllFournisseurs().subscribe((result: Fournisseur[]) => {
      this.fournisseurs = result;
    });
  }
  addPlanRepas(): void {
    this.newPlanRepas = new PlanRepas(this.addForm.value);
    this.newPlanRepas.frequence = this.addForm.value.frequence + " fois par semaine";
    try {
      this.controller.addPlanrepas(this.newPlanRepas).subscribe();
      this.dialogRef.close("Successfully added!")
      this.openSnackBar("Succesfully Added", "")
    }
    catch {
      this.dialogRef.close("Error: Retry to add")
      this.openSnackBar("Error: ", " Veuillez Reessayer d'ajouter")
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
}
