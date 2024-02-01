import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaceUserComponent } from './espace-user/espace-user.component';
import { EspaceGestionnaireComponent } from './espace-gestionnaire/espace-gestionnaire.component';
import { MenuComponent } from './menu/menu.component';
import { MonEspaceComponent } from './mon-espace/mon-espace.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockPcComponent } from './stock-pc/stock-pc.component';
import { LesUsersComponent } from './les-users/les-users.component';
import { UsersModifieComponent } from './les-users/users-modifie/users-modifie.component';
import { PcModifieComponent } from './stock-pc/pc-modifie/pc-modifie.component';
import { AjoutPcComponent } from './ajout-pc/ajout-pc.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { DemandePcComponent } from './demande-pc/demande-pc.component';
import { DemandeVPNComponent } from './demande-vpn/demande-vpn.component';
import { AffectePcComponent } from './demande-pc/affecte-pc/affecte-pc.component';
import { DatePipe } from '@angular/common';
import { ProlongePcComponent } from './prolonge-pc/prolonge-pc.component';
import { ProlongeVpnComponent } from './prolonge-vpn/prolonge-vpn.component';

@NgModule({
  declarations: [
    AppComponent,
    EspaceUserComponent,
    EspaceGestionnaireComponent,
    MenuComponent,
    MonEspaceComponent,
    StockPcComponent,
    LesUsersComponent,
    UsersModifieComponent,
    PcModifieComponent,
    AjoutPcComponent,
    AjoutUserComponent,
    DemandePcComponent,
    DemandeVPNComponent,
    AffectePcComponent,
    ProlongePcComponent,
    ProlongeVpnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
