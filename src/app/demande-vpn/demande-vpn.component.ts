import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';
import { DatePipe } from '@angular/common';
import { DemandePc } from '../classes/demande-pc';
import { DemandeVpn } from '../classes/demande-vpn';
import { AffectationVpn } from '../classes/affectation-vpn';

@Component({
  selector: 'app-demande-vpn',
  templateUrl: './demande-vpn.component.html',
  styleUrls: ['./demande-vpn.component.css']
})
export class DemandeVPNComponent implements OnInit{
  gestionnaire!:Gestionnaire;
  lesUsers:User[]=[];
  demande:any[]=[];
  date_fin!:string;
  dispo=false;
  refuse="Votre Demande D'accés VPN est Refusé car : ";
  user: any;
  dateDeb!: string;
  dVpn!:AffectationVpn
  constructor(private vServ:GestionService,private router:Router,private date:DatePipe){}
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}

    this.vServ.getDemandesVpn().subscribe(data=>{this.demande=data})

    //this.vServ.getUsers().subscribe(data=>{this.lesUsers=data})
    this.vServ.getGestionnaireById(Number(localStorage.getItem("id"))).subscribe(
      gestionnaire => {
        this.gestionnaire = gestionnaire;
       // this.users();
      }); 
  }
  /*
  users(){
    for (let i = 0; i < this.lesUsers.length; i++) {
      const x =this.gestionnaire.u_demande_vpn.findIndex((u:any)=>u==this.lesUsers[i].id); 
      if(x!=-1)
      this.demande.push(this.lesUsers[i]);
    }
  }*/

   async onRefuse(u:any){
    this.refuse+=window.prompt("Donner la Cause De Refuse:");
    this.demande=this.demande.filter((us:User)=>us.id!=u.id)
    this.user=await this.vServ.getUserById(Number(u.id_user)).toPromise()
    this.user.refuseVpn=this.refuse;
    this.vServ.modifyUser(this.user).subscribe(
      res=>{})
      this.vServ.deleteDemandeVpn(u.id).subscribe();
  }
  async onAccepte(u:any){
    let aa = this.date.transform(new Date(), 'yyyy-MM-dd');
    if (aa != null)
      this.dateDeb = aa;
    
    let today = new Date();
    today.setMonth(today.getMonth() + 1);
    let today1 = this.date.transform(today, 'yyyy-MM-dd');
    if (today1 != null)
      this.date_fin = today1;
this.dVpn=new AffectationVpn(0,u.id_user,this.dateDeb,this.date_fin);
this.vServ.createAffectationVpn(this.dVpn).subscribe(
      res=>{alert("Accés Donné avec succés")}
    )
    this.vServ.createHistAffectationVpn(this.dVpn).subscribe(
      res => {
      }
    );
    await this.vServ.getDemandesVpn().subscribe(res => {
      const demands = res.filter(d2 => d2.id_user == u.id_user);
      
      if (demands.length > 0) {
        console.log(demands);
        this.vServ.cModifier1 = demands[0];
        console.log(this.vServ.cModifier1);
  
        this.vServ.deleteDemandeVpn(Number(this.vServ.cModifier1.id)).subscribe(
          res => {this.ngOnInit(); },
          error => { console.error("Error deleting demande:", error); }
        );
      }
    });
    
  
}
}
