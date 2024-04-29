import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { DatePipe } from '@angular/common';
import { Pc } from '../classes/pc';
import { Router } from '@angular/router';
import { AffectationVpn } from '../classes/affectation-vpn';

@Component({
  selector: 'app-prolonge-vpn',
  templateUrl: './prolonge-vpn.component.html',
  styleUrls: ['./prolonge-vpn.component.css']
})
export class ProlongeVpnComponent implements OnInit{
gestionnaire!:Gestionnaire
date_fin!:any;
d:any
lesDemandes:any[]=[]
users:any[]=[];
  constructor(private vServ:GestionService,private date:DatePipe,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}

    this.vServ.getGestionnaireById(Number(localStorage.getItem('id'))).subscribe(
      data => {this.gestionnaire = data;})

      this.vServ.getDemandeProlongeVpn().subscribe(
        data => {this.lesDemandes = data;})

      this.vServ.getUsers().subscribe(
        data => {this.users = data;})
      
  }

  onRefuse(u:any){
    this.vServ.deleteDemandeProlongeVpn(u.id).subscribe(res=>{
      alert("deleted")
    })
    this.ngOnInit();
  }

  onAccepte(u: any) {
    const today = new Date();
    this.date_fin = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    this.date_fin = this.date.transform(this.date_fin, "yyyy-MM-dd") || "";
  
    this.vServ.getAffectationsVpn().subscribe(res => {
      this.d = res.find(data => data.id_user === u.id_user); // Use find instead of filter
      console.log(this.d);
  
      if (this.d != null) {
        this.d.date_fin = this.date_fin;
        this.vServ.modifyAffectationVpn(this.d).subscribe(
          res => { alert("demande de prolongation d'accés accepté"); this.ngOnInit()}
        );
      } else {
        const dvpn = new AffectationVpn(0, u.id_user, this.date.transform(new Date(), "yyyy-MM-dd") || "", this.date_fin);
        this.vServ.createAffectationVpn(dvpn).subscribe(
          res => {  }
        );
      }
  
      this.vServ.deleteDemandeProlongeVpn(u.id).subscribe(res => {
        alert("deleted");
        this.ngOnInit(); // Move ngOnInit inside the delete subscription callback
      });
    });
  }
  



}
