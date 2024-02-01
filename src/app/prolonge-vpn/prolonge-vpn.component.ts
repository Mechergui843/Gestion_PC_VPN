import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { DatePipe } from '@angular/common';
import { Pc } from '../classes/pc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prolonge-vpn',
  templateUrl: './prolonge-vpn.component.html',
  styleUrls: ['./prolonge-vpn.component.css']
})
export class ProlongeVpnComponent implements OnInit{
gestionnaire!:Gestionnaire
lesDemandes:User[]=[]
date_fin!:string;
dispo=false;
x:any
  constructor(private vServ:GestionService,private date:DatePipe,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}
    this.vServ.getGestionnaireById(Number(localStorage.getItem('id')))
      .subscribe(
        data => {
          this.gestionnaire = data;
          
          this.gestionnaire.u_prolonge_vpn.forEach((element:any) => {
            this.vServ.getUserById(element).subscribe(
              data=>{
              this.lesDemandes.push(data);
              
              }
            )
            
          });
        }
      );
      console.log(this.lesDemandes)
      
  }

  onRefuse(u:User){
    this.gestionnaire.u_prolonge_vpn=this.gestionnaire.u_prolonge_vpn.filter((id:any)=>id!=u.id);
    this.lesDemandes=this.lesDemandes.filter((us:any)=>us.id!=u.id)
    this.vServ.cModifier=this.gestionnaire;
    this.vServ.modifyGestionnaire(this.vServ.cModifier).subscribe(
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
    let aa=this.date.transform(new Date(), 'yyyy-MM-dd')
  if(aa!=null)
  this.x=this.date.transform(this.date_fin,"yyyy-MM-dd") || "";
    let today=new Date();
    let finalDay=new Date(this.x)
    if(finalDay.getTime()<=today.getTime())
    {
      alert("Veuillez Choisir une Date Valide");
      return;
    }
    let timeDiff=  finalDay.getTime()-today.getTime();
    let daysDiff=timeDiff/(1000*60*60*24);
    if(daysDiff>30){
      alert("vous ne pouvez pas prolonger un accés pour plus que 30 jours");
      return
    }
    u.date_fin=this.date.transform(this.date_fin,"yyyy-MM-dd") || "";
    this.vServ.cModifier=u;
    this.vServ.modifyUser(this.vServ.cModifier).subscribe(
      res=>{}
    )
    this.gestionnaire.u_prolonge_vpn=this.gestionnaire.u_prolonge_vpn.filter((id:any)=>id!=u.id);
    this.vServ.cModifier=this.gestionnaire;
    this.vServ.modifyGestionnaire(this.vServ.cModifier).subscribe()
    
}



}
