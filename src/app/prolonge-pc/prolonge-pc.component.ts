import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { forkJoin, tap } from 'rxjs';
import { User } from '../classes/user';
import { Pc } from '../classes/pc';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DemandePc } from '../classes/demande-pc';
import { AffectationPc } from '../classes/affectation-pc';

@Component({
  selector: 'app-prolonge-pc',
  templateUrl: './prolonge-pc.component.html',
  styleUrls: ['./prolonge-pc.component.css']
})
export class ProlongePcComponent implements OnInit{
gestionnaire!:any;
lesDemandes:any[]=[]
lesPcs!:any[]
date_fin!:any;
users:any[]=[];
d!:any;
  constructor(private pcServ:GestionService,private date:DatePipe,private router:Router){}
  
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}

    this.pcServ.getGestionnaireById(Number(localStorage.getItem('id'))).subscribe(
      data => {this.gestionnaire = data;})

      this.pcServ.getUsers().subscribe(
        data => {this.users = data;})

      this.pcServ.getDemandeProlongePc().subscribe(
      data => {this.lesDemandes = data;})
      this.pcServ.getPC().subscribe(data=>{this.lesPcs=data});
  }
  
  onRefuse(u:any){
    this.pcServ.deleteDemandeProlongePc(u.id).subscribe(res=>{
      alert("deleted")
    })
    this.ngOnInit();
    
  }

  onAccepte(u: any) {
    const today = new Date();
    this.date_fin = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.date_fin = this.date.transform(this.date_fin, "yyyy-MM-dd") || "";
  
    this.pcServ.getAffectationsPc().subscribe(res => {
      this.d = res.find(data => data.id_user == u.id_user);
      
      if (this.d != null) {
        this.d.date_fin = this.date_fin;
        this.pcServ.modifyAffectationPc(this.d).subscribe(
          res => { alert("demande de prolongation accepté"); this.ngOnInit()}
        );
      } else {
        const dpc = new AffectationPc(0, u.id_pc, u.id_user, this.date.transform(new Date(), "yyyy-MM-dd") || "", this.date_fin);
        this.pcServ.createAffectationPc(dpc).subscribe(
          res => {this.ngOnInit()}
        );
      }
  
      this.pcServ.deleteDemandeProlongePc(u.id).subscribe(res => {
        alert("deleted");
        this.ngOnInit(); // Move ngOnInit inside the delete subscription callback
      });
    });
  }
  
  
  
}
