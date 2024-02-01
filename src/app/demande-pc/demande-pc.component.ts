import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-demande-pc',
  templateUrl: './demande-pc.component.html',
  styleUrls: ['./demande-pc.component.css']
})
export class DemandePcComponent implements OnInit{
gestionnaire!:Gestionnaire;
lesUsers:User[]=[];
demande:User[]=[];
fc=false;
refuse="Votre Demande De PC est Refusé car : ";
constructor(private pcServ:GestionService,private router:Router){}
ngOnInit(): void {
  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="gestionnaire"){
      this.router.navigate(["/Espace_Gestionnaire"]);
    }
  }else{this.router.navigate(["/Espace_Gestionnaire"]);}
  this.pcServ.getUsers().subscribe(data=>{this.lesUsers=data})
  this.pcServ.getGestionnaireById(Number(localStorage.getItem("id"))).subscribe(
    gestionnaire => {
      this.gestionnaire = gestionnaire;
      this.users();
    });
  
  
}
users(){
  for (let i = 0; i < this.lesUsers.length; i++) {
    const x =this.gestionnaire.u_demande_pc.findIndex((u:any)=>u==this.lesUsers[i].id); 
    if(x!=-1)
    this.demande.push(this.lesUsers[i]);
  }
  this.demande.forEach(element => {
  })
}
onRefuse(u:User){
  this.refuse+=window.prompt("Donner la Cause De Refuse:");
  this.gestionnaire.u_demande_pc=this.gestionnaire.u_demande_pc.filter(id=>id!=u.id);
  this.demande=this.demande.filter((us:User)=>us.id!=u.id)
  this.pcServ.cModifier=this.gestionnaire;
  this.pcServ.modifyGestionnaire(this.pcServ.cModifier).subscribe(
      res=>{alert("Demande refusée");})
      u.refusePc=this.refuse;
        this.pcServ.cModifier1=u;
    this.pcServ.modifyUser(this.pcServ.cModifier1).subscribe(
      res=>{})
      this.router.navigate(["/Demande_Pc"]);
}
onAffecter(i:any){
  this.fc=true;
  this.pcServ.cModifier=i;
}
}
