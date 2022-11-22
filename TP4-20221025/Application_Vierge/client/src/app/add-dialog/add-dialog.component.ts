import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlanRepas } from 'src/interfaces/planrepas';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  addForm: FormGroup;
  newPlanRepas: PlanRepas;
  confirmed: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, private readonly controller: ClientControllerService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      numeroplan: new FormControl("",[Validators.required, Validators.maxLength(4)]),
      categorie: new FormControl([Validators.required, Validators.maxLength(20)]),
      frequence: new FormControl([Validators.required, Validators.maxLength(20)]),
      nbrpersonnes: new FormControl([Validators.required]),
      nbrcalories: new FormControl([Validators.required]),
      prix: new FormControl([Validators.required]),
      numerofournisseur: new FormControl("",[Validators.required, Validators.maxLength(4)])

  });
  }
  addPlanRepas(): void {
    this.newPlanRepas = new PlanRepas(this.addForm.value);
    this.controller.addPlanrepas(this.newPlanRepas).subscribe();
  }
  confirm(): void{
    this.confirmed = true;
  }
}
