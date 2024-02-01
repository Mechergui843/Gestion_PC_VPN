import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demande-vpn',
  templateUrl: './demande-vpn.component.html',
  styleUrls: ['./demande-vpn.component.css']
})
export class DemandeVPNComponent implements OnInit{
  gestionnaire!:Gestionnaire;
  lesUsers:User[]=[];
  demande:User[]=[];
  date_fin!:string;
  dispo=false;
  refuse="Votre Demande D'accés VPN est Refusé car : ";
  constructor(private vServ:GestionService,private router:Router,private date:DatePipe){}
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}
    this.vServ.getUsers().subscribe(data=>{this.lesUsers=data})
    this.vServ.getGestionnaireById(Number(localStorage.getItem("id"))).subscribe(
      gestionnaire => {
        this.gestionnaire = gestionnaire;
        this.users();
      }); 
  }
  users(){
    for (let i = 0; i < this.lesUsers.length; i++) {
      const x =this.gestionnaire.u_demande_vpn.findIndex((u:any)=>u==this.lesUsers[i].id); 
      if(x!=-1)
      this.demande.push(this.lesUsers[i]);
    }
  }
   onRefuse(u:User){
    this.refuse+=window.prompt("Donner la Cause De Refuse:");
    this.gestionnaire.u_demande_vpn=this.gestionnaire.u_demande_vpn.filter(id=>id!=u.id);
    this.demande=this.demande.filter((us:User)=>us.id!=u.id)
    this.vServ.cModifier=this.gestionnaire;
    this.vServ.modifyGestionnaire(this.vServ.cModifier).subscribe(
        res=>{alert("Demande refusée");})
        u.refuseVpn=this.refuse;
        this.vServ.cModifier1=u;
    this.vServ.modifyUser(this.vServ.cModifier1).subscribe(
      res=>{})
  }
  onAjoute(){
    this.dispo=true;
  }
  onAccepte(u:User){
    if(this.date_fin==null){
      alert("choisir une date pour la fin d'acces d'abord");
    return 
    }
    u.vpn=true;
    let aa=this.date.transform(new Date(), 'yyyy-MM-dd')
  if(aa!=null)
    u.date_deb=aa;
    u.date_fin=this.date.transform(this.date_fin,"yyyy-MM-dd") || "";
    let today=new Date(u.date_deb);
    let finalDay=new Date(u.date_fin)
    if(finalDay.getTime()<=today.getTime())
    {
      alert("Veuillez Choisir une Date Valide");
      return;
    }
    let timeDiff=  finalDay.getTime()-today.getTime();
    let daysDiff=timeDiff/(1000*60*60*24);
    if(daysDiff>30){
      alert("vous ne pouvez pas donner un accés pour plus que 30 jours");
      return
    }
    this.vServ.cModifier=u;
    this.vServ.modifyUser(this.vServ.cModifier).subscribe(
      res=>{alert("Accés Donnée avec succés")}
    )
    this.gestionnaire.u_demande_vpn=this.gestionnaire.u_demande_vpn.filter(id=>id!=u.id);
    this.demande=this.demande.filter((us:User)=>us.id!=u.id)
    this.vServ.cModifier=this.gestionnaire;
    this.vServ.modifyGestionnaire(this.vServ.cModifier).subscribe()
    
}
}
