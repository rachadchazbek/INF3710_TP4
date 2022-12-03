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
  numeroPlan:string;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, private readonly controller: ClientControllerService) { }

  ngOnInit(): void {
    //this.getnumeroPlan().then((num)=>this.numeroPlan = num);
    console.log(this.numeroPlan);
    this.addForm = new FormGroup({
      numeroplan: new FormControl("",[Validators.required, Validators.maxLength(4)]),
      categorie: new FormControl("",[Validators.required, Validators.maxLength(20)]),
      frequence: new FormControl("",[Validators.required, Validators.maxLength(20)]),
      nbrpersonnes: new FormControl([Validators.required]),
      nbrcalories: new FormControl([Validators.required]),
      prix: new FormControl([Validators.required]),
      numerofournisseur: new FormControl("",[Validators.required, Validators.maxLength(4)])

  });
  }
  async getnumeroPlan(): Promise<string> {
    const DEFAULT_NOPLAN = 'P0'
    let index = 1;
    let notFound = true;
    let current_num: string = "";
    while(notFound){
       current_num= DEFAULT_NOPLAN.concat(index.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }).toString());
      try{
        console.log("a");
        this.controller.getPlanRepas(current_num).subscribe((result:PlanRepas[]) =>{
            if(!result[0]){
              notFound = false;
            }
        });
        index+=1;
      }
      catch{
       
      }
    }
    return current_num;
     
  }
  addPlanRepas(): void {
    this.newPlanRepas = new PlanRepas(this.addForm.value);
    try{
    this.controller.addPlanrepas(this.newPlanRepas).subscribe();
    this.dialogRef.close("Successfully added!")
    alert("Succesfully Added")
    }
    catch { this.dialogRef.close("Error: Retry to add")
  alert("Error: Veuillez Reessayer d'ajouter ")}
  }
  confirm(): void{
    this.confirmed = true;
  }
  close(): void {
    this.dialogRef.close();
  }
}
