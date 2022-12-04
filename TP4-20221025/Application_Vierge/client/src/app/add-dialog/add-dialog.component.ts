import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanRepas } from 'src/interfaces/planrepas';
import { ClientControllerService } from '../services/client-controller.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  addForm: FormGroup;
  numeroPlan: string;
  newPlanRepas: PlanRepas;
  confirmed: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, private readonly controller: ClientControllerService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    //this.getnumeroPlan().then((num)=>{this.numeroPlan = num});
    this.controller.getPlanRepas("P00").subscribe((result) => { console.log(result) });
    console.log(this.numeroPlan);
    this.addForm = new FormGroup({
      numeroplan: new FormControl(""),
      categorie: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      frequence: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      nbrpersonnes: new FormControl([Validators.required]),
      nbrcalories: new FormControl([Validators.required]),
      prix: new FormControl([Validators.required]),
      numerofournisseur: new FormControl("", [Validators.required, Validators.maxLength(4)])
    });
  }
  // async getnumeroPlan(): string {
  //   let planRepas: PlanRepas[] = await this.controller.getAllPlanRepas().subscribe();
  //   let lastnum  = list[list.length].numeroplan;
  //   return num
  // const DEFAULT_NOPLAN = 'P0'
  // let index = 1;
  // let notFound = true;
  // let current_num: string = "";
  // while(notFound){
  //   console.log(index);
  //    current_num= DEFAULT_NOPLAN.concat(index.toLocaleString('en-US', {
  //     minimumIntegerDigits: 2,
  //     useGrouping: false
  //   }).toString());
  //     await this.controller.getPlanRepas(current_num).subscribe((result) =>{
  //       console.log(result.length===0);
  //         if(result.length===0){
  //           notFound = false;
  //         }
  //         index+=1;
  //         console.log("a");
  //     });
  //     console.log("ab")
  //     notFound = false;


  //   }
  //   return current_num;

  // }
  addPlanRepas(): void {
    this.newPlanRepas = new PlanRepas(this.addForm.value);
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
      duration: 2000,
    });
  }
}
