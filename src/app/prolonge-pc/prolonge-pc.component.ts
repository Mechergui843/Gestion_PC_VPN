import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { forkJoin, tap } from 'rxjs';
import { User } from '../classes/user';
import { Pc } from '../classes/pc';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prolonge-pc',
  templateUrl: './prolonge-pc.component.html',
  styleUrls: ['./prolonge-pc.component.css']
})
export class ProlongePcComponent implements OnInit{
gestionnaire!:any;
lesDemandes:User[]=[]
lesPcs!:any[]
date_fin!:string;
dispo=false;
x:any
  constructor(private pcServ:GestionService,private date:DatePipe,private router:Router){}
  
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}
    this.pcServ.getGestionnaireById(Number(localStorage.getItem('id')))
    .subscribe(
      data => {
        this.gestionnaire = data;

        const observables = this.gestionnaire.u_prolonge_pc.map((element: any) =>
          this.pcServ.getUserById(element)
        );

        forkJoin(observables).subscribe(
          (userDataArray: any) => {
            this.lesDemandes = userDataArray;
            this.lesPcs = [];
for (let i = 0; i < this.lesDemandes.length; i++) {
  this.pcServ.getPcById(this.lesDemandes[i].id_pc).subscribe(
    data => {
      this.lesPcs.push(data);
    }
  );
}
          }
        );
      }
    );
  }
  onRefuse(u:User){
    this.gestionnaire.u_prolonge_pc=this.gestionnaire.u_prolonge_pc.filter((id:any)=>id!=u.id);
    this.lesDemandes=this.lesDemandes.filter((us:User)=>us.id!=u.id)
    this.pcServ.cModifier=this.gestionnaire;
    this.pcServ.modifyGestionnaire(this.pcServ.cModifier).subscribe(
        res=>{})
    
  }

  onAjoute(){
    this.dispo=true;
  }

  onAccepte(u:User,pc:Pc){
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
      alert("vous ne pouvez pas prolonger un Prêt pour plus que 30 jours");
      return
    }
    pc.date_fin=this.date.transform(this.date_fin,"yyyy-MM-dd") || "";
    this.pcServ.cModifier=pc;
    this.pcServ.modifyPc(this.pcServ.cModifier).subscribe(
      res=>{}
    )
    this.gestionnaire.u_prolonge_pc=this.gestionnaire.u_prolonge_pc.filter((id:any)=>id!=u.id);
    this.pcServ.cModifier=this.gestionnaire;
    this.pcServ.modifyGestionnaire(this.pcServ.cModifier).subscribe()
    
}
  
  
}
