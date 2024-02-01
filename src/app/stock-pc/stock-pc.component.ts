import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionService } from '../gestion.service';
import { Pc } from '../classes/pc';

@Component({
  selector: 'app-stock-pc',
  templateUrl: './stock-pc.component.html',
  styleUrls: ['./stock-pc.component.css']
})
export class StockPcComponent implements OnInit {
  fc=false;
lesPc:Pc[]=[];
constructor(private pcServ:GestionService, private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}
  this.pcServ.getPC().subscribe(data=>{this.lesPc=data})
}
onAjout(){
  this.router.navigate(['/Ajouter_PC']);
}
onDeletePc(pc:Pc){
  if(pc.dispo==false){
    alert("vous ne pouvez pas supprimer un pc en prêt");
    return 
  }
  this.pcServ.deletePc(pc.id).subscribe(
    () => {
      this.lesPc = this.lesPc.filter(a => a.id !== pc.id);
      
    },
  );
}
onMAJ(i:Pc){
  if(i.dispo==false){
    alert("Vous ne Pouvez Pas Mettre à Jour un Pc en Prêt");
  }else{
  if(!i.update){
  alert("Pc Déja Mis à Jour");
  return
  }
i.update=false
this.pcServ.modifyPc(i).subscribe(
  res=>{alert("Pc Mis à Jour")}
)}
}
onModifie(i:any){
  if(i.dispo==false){
    alert("Vous ne Pouvez Pas Modifier un Pc en Prêt");
  }else{
  this.fc=true;
  this.pcServ.cModifier=i;
  }
  }
}
