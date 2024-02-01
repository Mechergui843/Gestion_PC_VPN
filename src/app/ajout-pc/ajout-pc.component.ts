import { Component, OnInit } from '@angular/core';
import { Pc } from '../classes/pc';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';

@Component({
  selector: 'app-ajout-pc',
  templateUrl: './ajout-pc.component.html',
  styleUrls: ['./ajout-pc.component.css']
})
export class AjoutPcComponent implements OnInit {
  lesPcs:Pc[]=[];
  constructor(private pcServ:GestionService,private router:Router){}
ngOnInit(): void {
  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="gestionnaire"){
      this.router.navigate(["/Espace_Gestionnaire"]);
    }
  }else{this.router.navigate(["/Espace_Gestionnaire"]);}
  this.pcServ.getPC().subscribe(data=>{this.lesPcs=data})
}
onAjout(ff:any){
  if(ff.modele!="" && ff.ram!="" && ff.stockage!="" && ff.processeur!=""){
  let pc=new Pc(ff.id,ff.modele,ff.ram,ff.stockage,ff.processeur,true,"","",false);
  this.pcServ.createPc(pc as Pc).subscribe(
    data=>{
      this.lesPcs.push(data);
      alert("Utilisateur ajouté avec succés");
      this.router.navigate(["/Gestion_Pc"]);
    }
  );
  }else{
    alert("tous les champs doivent Etre non vide");
  }
}
}
