import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { WelcomePageComponent } from "../pages/welcome-page/welcome-page.component";
import { PlanRepasTableComponent } from "../plan-repas-table/plan-repas-table.component";

const routes: Routes = [
  {
    path: "app", component: AppComponent,
  },
  {
    path: "welcome", component: WelcomePageComponent  },
  {
    path: "planrepas", component: PlanRepasTableComponent
  },
  { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
