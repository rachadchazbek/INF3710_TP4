import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private dialogRef: MatDialogRef<DialogComponent>, private controller: ClientControllerService, private snackbar: MatSnackBar) {
    if (this.data) {
      this.message = this.data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  delete(): void {
    try {
      this.controller.deletePlanrepas(this.data.numeroplan).subscribe();
      this.dialogRef.close(true);
      //TO DO : Open snackbar WORKED:
      this.openSnackBar("Planrepas supprimé!", "");
    }
    catch {
      // Open snackbar error
      this.openSnackBar("Erreur", "Veuillez réessayer de supprimer", "error-message");
    }
  }
  close(): void {
    this.dialogRef.close(true);
  }
  openSnackBar(message: string, action: string, color: string = "success-message") {
    this.snackbar.open(message, action, {
      duration: 5000,
      panelClass: [color]

    });
  }
}
