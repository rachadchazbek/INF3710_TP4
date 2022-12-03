import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { PlanRepasTableComponent } from "./plan-repas-table/plan-repas-table.component";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AddDialogComponent,
    UpdateDialogComponent,
    WelcomePageComponent,
    PlanRepasTableComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
