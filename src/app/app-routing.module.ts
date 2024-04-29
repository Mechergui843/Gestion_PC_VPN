import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceGestionnaireComponent } from './espace-gestionnaire/espace-gestionnaire.component';
import { EspaceUserComponent } from './espace-user/espace-user.component';
import { MonEspaceComponent } from './mon-espace/mon-espace.component';
import { StockPcComponent } from './stock-pc/stock-pc.component';
import { LesUsersComponent } from './les-users/les-users.component';
import { DemandePcComponent } from './demande-pc/demande-pc.component';
import { DemandeVPNComponent } from './demande-vpn/demande-vpn.component';
import { ProlongePcComponent } from './prolonge-pc/prolonge-pc.component';
import { ProlongeVpnComponent } from './prolonge-vpn/prolonge-vpn.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"Espace_User",title:"Espace User",component:EspaceUserComponent},
  {path:"Espace_Gestionnaire",title:"Espace Gestionnaire",component:EspaceGestionnaireComponent},
  {path:"Mon_Espace",title:"Mon Espace",component:MonEspaceComponent},
  {path:"Gestion_Pc",title:"Gestion Pc",component:StockPcComponent},
  {path:"Gestion_User",title:"Gestion User",component:LesUsersComponent},
  {path:"Demande_Pc",title:"Demande Pc",component:DemandePcComponent},
  {path:"Demande_vpn",title:"Demande VPN",component:DemandeVPNComponent},
  {path:"Prolongation_Pc",title:"Prolongation Pc",component:ProlongePcComponent},
  {path:"Prolongation_vpn",title:"Prolongation VPN",component:ProlongeVpnComponent},
  {path:"Dashboard",title:"Dashboard",component:DashboardComponent},
  {path:'',redirectTo:'Espace_User',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
