import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientControllerService } from 'src/app/services/client-controller.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>, private controller: ClientControllerService) {
      if(this.data){
    this.message = this.data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(): void {
    try{
      console.log("dnjn");
      this.controller.deletePlanrepas(this.data.numeroplan).subscribe();
      this.dialogRef.close(true);
      //TO DO : Open snackbar WORKED:
    }
    catch{
      // Open snackbar error
    }
  }
  close(): void {
    this.dialogRef.close();
}
}
