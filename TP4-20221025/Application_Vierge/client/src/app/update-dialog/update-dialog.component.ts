import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  updatedForm: FormGroup;
  updatedPlanRepas: PlanRepas;
  initialForm: PlanRepas;
  confirmed: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : any, private readonly controller: ClientControllerService) { }

  ngOnInit(): void {
    console.log(this.data.numeroplan);
    this.controller.getPlanRepas(this.data.numeroplan).subscribe((result: PlanRepas[])=>{ 
      console.log(result); 
      this.initialForm = new PlanRepas(result[0]);
      this.updatedForm = new FormGroup({
        numeroplan: new FormControl(this.initialForm.numéroplan,[Validators.required, Validators.maxLength(4)]),
        categorie: new FormControl(this.initialForm.catégorie,[Validators.required, Validators.maxLength(20)]),
        frequence: new FormControl(this.initialForm.fréquence,[Validators.required, Validators.maxLength(20)]),
        nbrpersonnes: new FormControl(this.initialForm.nbrpersonnes, [Validators.required]),
        nbrcalories: new FormControl(this.initialForm.nbrcalories,[Validators.required]),
        prix: new FormControl(this.initialForm.prix,[Validators.required]),
        numerofournisseur: new FormControl(this.initialForm.numérofournisseur,[Validators.required, Validators.maxLength(4)])
  
    });
    console.log(this.initialForm.numéroplan);
    });
    
    
  }
  updatePlanRepas(): void {
    this.updatedPlanRepas = new PlanRepas(this.updatedForm.value);
    try{
    this.controller.updatePlanRepas(this.updatedPlanRepas).subscribe();
    this.dialogRef.close("Successfully added!")
    alert("Succesfully Added")
    }
    catch { this.dialogRef.close("Error: Retry to add")
  alert("Error: Veuillez Reessayer d'ajouter ")}
  }
  confirm(): void{
    this.confirmed = true;
  }
}
