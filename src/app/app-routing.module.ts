import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {RegisterComponent} from "./register/register.component";
import {SymptomsComponent} from "./symptoms/symptoms.component";
import {PreventionComponent} from "./prevention/prevention.component";
import {NewandupdatesComponent} from "./newandupdates/newandupdates.component";

const routes: Routes = [
  {path:'search', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'symptoms', component: SymptomsComponent},
  {path: 'prevention', component: PreventionComponent},
  {path: 'news', component: NewandupdatesComponent},
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: '**', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
