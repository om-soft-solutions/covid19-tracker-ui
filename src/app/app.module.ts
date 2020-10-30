import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { NewandupdatesComponent } from './newandupdates/newandupdates.component';
import { PreventionComponent } from './prevention/prevention.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpService} from "./service/http.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SearchComponent,
    AdminComponent,
    NewandupdatesComponent,
    PreventionComponent,
    SymptomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
