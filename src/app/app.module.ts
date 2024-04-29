import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaceUserComponent } from './espace-user/espace-user.component';
import { EspaceGestionnaireComponent } from './espace-gestionnaire/espace-gestionnaire.component';
import { MenuComponent } from './menu/menu.component';
import { MonEspaceComponent } from './mon-espace/mon-espace.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockPcComponent } from './stock-pc/stock-pc.component';
import { LesUsersComponent } from './les-users/les-users.component';
import { DemandePcComponent } from './demande-pc/demande-pc.component';
import { DemandeVPNComponent } from './demande-vpn/demande-vpn.component';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProlongePcComponent } from './prolonge-pc/prolonge-pc.component';
import { ProlongeVpnComponent } from './prolonge-vpn/prolonge-vpn.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EspaceUserComponent,
    EspaceGestionnaireComponent,
    MenuComponent,
    MonEspaceComponent,
    StockPcComponent,
    LesUsersComponent,
    DemandePcComponent,
    DemandeVPNComponent,
    ProlongePcComponent,
    ProlongeVpnComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
