import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { AddPageComponent } from "../pages/add-page/add-page.component";
import { DeletePageComponent } from "../pages/delete-page/delete-page.component";
import { PlanRepasTableComponent } from "../pages/plan-repas-table/plan-repas-table.component";

const routes: Routes = [
  {
    path: "app", component: AppComponent,
  },
  {
    path: "add", component: AddPageComponent,
  },
  {
    path: "delete", component: DeletePageComponent,
  },
  {
    path: "planrepas", component: PlanRepasTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
