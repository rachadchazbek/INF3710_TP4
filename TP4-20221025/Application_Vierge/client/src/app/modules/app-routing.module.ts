import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";
import { PlanRepasTableComponent } from "../plan-repas-table/plan-repas-table.component";

const routes: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  {
    path: "welcome", component: WelcomePageComponent
  },
  {
    path: "planrepas", component: PlanRepasTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
