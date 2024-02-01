import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';

@Component({
  selector: 'app-les-users',
  templateUrl: './les-users.component.html',
  styleUrls: ['./les-users.component.css']
})
export class LesUsersComponent implements OnInit {
  fc=false;
lesUsers:User[]=[];
gestionnaire!:Gestionnaire;
constructor(private uServ:GestionService, private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}
    this.gestionnaire=this.uServ.logAccount;
  this.uServ.getUsers().subscribe(data=>{this.lesUsers=data})
  
}
onAjout(){
  this.router.navigate(['/Ajouter_User']);
}
onDeleteUser(user:User){
  this.onVerifie(user);
  this.uServ.deleteUser(user.id).subscribe(
    () => {
      this.lesUsers = this.lesUsers.filter(a => a.id !== user.id);
      alert("L'utilisateur a été supprimé avec succés ");
    },
  );
}
onVerifie(user:User){
  const i1=this.gestionnaire.u_demande_pc.findIndex((us:number)=>us==user.id);
  const i2=this.gestionnaire.u_demande_vpn.findIndex((us:number)=>us==user.id);
  const i3=this.gestionnaire.u_prolonge_pc.findIndex((us:number)=>us==user.id);
  const i4=this.gestionnaire.u_prolonge_vpn.findIndex((us:number)=>us==user.id);
  if(i1!=-1)
  this.gestionnaire.u_demande_pc=this.gestionnaire.u_demande_pc.filter((us:number)=>us!=user.id)

  if(i2!=-1)
  this.gestionnaire.u_demande_vpn=this.gestionnaire.u_demande_vpn.filter((us:number)=>us!=user.id)

  if(i3!=-1)
  this.gestionnaire.u_prolonge_pc=this.gestionnaire.u_prolonge_pc.filter((us:number)=>us!=user.id)

  if(i4!=-1)
  this.gestionnaire.u_prolonge_vpn=this.gestionnaire.u_prolonge_vpn.filter((us:number)=>us!=user.id)
this.uServ.modifyGestionnaire(this.gestionnaire).subscribe()
}
onModifie(i:any){
  this.fc=true;
  this.uServ.cModifier=i;
  
  }
}