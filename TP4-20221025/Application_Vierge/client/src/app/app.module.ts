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
import { AddPageComponent } from './pages/add-page/add-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { UpdatePageComponent } from './services/update-page/update-page.component';
import { WelcomePageComponent } from './services/welcome-page/welcome-page.component';
import { PlanRepasTableComponent } from './pages/plan-repas-table/plan-repas-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AddPageComponent,
    DeletePageComponent,
    UpdatePageComponent,
    WelcomePageComponent,
    PlanRepasTableComponent
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
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
