import { Component, OnInit, ViewChild } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Pc } from '../classes/pc';
import { User } from '../classes/user';
import { Gestionnaire } from '../classes/gestionnaire';
import { Router } from '@angular/router';
import { DemandePc } from '../classes/demande-pc';
import { DatePipe } from '@angular/common';
import { AffectationPc } from '../classes/affectation-pc';
import { DemandeVpn } from '../classes/demande-vpn';
import { DemandeProlongationPc } from '../classes/demande-prolongation-pc';
import { DemandeProlongationVpn } from '../classes/demande-prolongation-vpn';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mon-espace',
  templateUrl: './mon-espace.component.html',
  styleUrls: ['./mon-espace.component.css']
})
export class MonEspaceComponent {
  lesGestionnaire:Gestionnaire[]=[];
  demandePc=false;
  demandeVPN=false;
user!:User
d!:DemandePc
d1!:DemandeVpn
dpPc!:DemandeProlongationPc
dpVpn!:DemandeProlongationVpn
pc!:Pc;
daysDiff!:any
daysDiffVPN!:any
id:number=Number(localStorage.getItem('id'));
lesPcs:Pc[]=[];
lesAffectationsPC!:any[];
lesAffectationsVpn!:any[];
lesDemandesPc!:any[];
lesDemandesVpn!:any[];
lesDemandesProlongePc!:any[];
lesDemandesProlongeVpn!:any[];
prolonge!:boolean;
update!:boolean
prolongeVPN!:boolean;
constructor(private uServ:GestionService,private router:Router,private date:DatePipe){}
async ngOnInit(): Promise<void> {

  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="user"){
      this.router.navigate(["/Espace_User"]);
    }
  }else{this.router.navigate(["/Espace_User"]);}
  
this.uServ.getUserById(Number(localStorage.getItem("id"))).subscribe(
  res=>{this.user=res}
)

  const data = await this.uServ.getPC().toPromise();
  if (data) 
    this.lesPcs = data;

    const pcRequest = this.uServ.getPC();
    const affectationsPcRequest = this.uServ.getAffectationsPc();
    const affectationsVpnRequest = this.uServ.getAffectationsVpn();
    const demandesPcRequest = this.uServ.getDemandesPc();
    const demandesVpnRequest = this.uServ.getDemandesVpn();
    const demandeProlongePcRequest = this.uServ.getDemandeProlongePc();
    const demandeProlongeVpnRequest = this.uServ.getDemandeProlongeVpn();

    forkJoin({
        pcData: pcRequest,
        affectationsPcData: affectationsPcRequest,
        affectationsVpnData: affectationsVpnRequest,
        demandesPcData: demandesPcRequest,
        demandesVpnData: demandesVpnRequest,
        demandeProlongePcData: demandeProlongePcRequest,
        demandeProlongeVpnData: demandeProlongeVpnRequest
    }).subscribe(({ pcData, affectationsPcData, affectationsVpnData, demandesPcData, demandesVpnData, demandeProlongePcData, demandeProlongeVpnData }) => {
        this.lesPcs = pcData;
        this.lesAffectationsPC = affectationsPcData.filter(af => af.id_user == this.user.id);
        this.lesAffectationsVpn = affectationsVpnData.filter(af => af.id_user == this.user.id);
        this.lesDemandesPc = demandesPcData.filter(d => d.id_user == this.user.id);
        this.lesDemandesVpn = demandesVpnData.filter(d => d.id_user == this.user.id);
        this.lesDemandesProlongePc = demandeProlongePcData.filter(d => d.id_user == this.user.id);
        this.lesDemandesProlongeVpn = demandeProlongeVpnData.filter(d => d.id_user == this.user.id);

        if (this.lesAffectationsVpn.length > 0) {
            this.demandeVPN = true;
        }

        this.ordinateur();
        this.onCalcule();
        this.onCalculeVPN();
    });
  if(this.lesAffectationsVpn.length>0)
  this.demandeVPN=true

  
  this.prolonge=false;
  

  if(this.daysDiffVPN>3)
  this.prolongeVPN=true
  
  if(this.daysDiff>3){
  this.prolonge=true
  this.update=true
  }

}

onSupprime(x:string){
  if(x==this.user.refusePc)
this.user.refusePc=""
else
this.user.refuseVpn=""
this.uServ.modifyUser(this.user).subscribe(
  res=>{}
)
}

 ordinateur(){
  if (this.lesAffectationsPC && this.lesAffectationsPC.length > 0) {
      for (let i = 0; i < this.lesPcs.length; i++) {
          if (this.lesPcs[i].id == this.lesAffectationsPC[0].id_pc) {
              this.pc = this.lesPcs[i];
              console.log(this.pc);
          }
      }
  }
  console.log(this.pc);
}

onCalcule(){
  if(this.lesAffectationsPC.length>0){
  let today=new Date();
  let o= new Date(this.lesAffectationsPC[0].date_fin);
  let timeDiff=  o.getTime()-today.getTime() ;
   this.daysDiff=timeDiff/(1000*60*60*24);
   return this.daysDiff
}
}

  onProlonge(){
    if(this.daysDiff<3){
      if(this.lesDemandesProlongePc.length>0){
        alert("Vous avez déja déposer une demande de prolongation De Prêt");
        this.prolonge=true;
      }else{
        const aa=this.date.transform(new Date(), 'yyyy-MM-dd')
      if(aa!=null)
      this.dpPc=new DemandeProlongationPc(0,this.lesAffectationsPC[0].id_pc,this.user.id,aa);
      this.uServ.createDemandeProlongePc(this.dpPc).subscribe(
        res=>{
          alert("Demande de Prolongation Deposée avec succées");
          this.prolonge=true;
        }
      )
    }
  }
  else{alert("vous ne pouvez pas demander une prolongationdu pc maintenant attendez jusqu'à la fin du prêt");
this.prolonge=true}
  }

  onProlongeVPN(){
    if(this.daysDiffVPN<3){
      if(this.lesDemandesProlongeVpn.length>0){
        alert("Vous avez déja déposer une demande de prolongation D'accés");
        this.prolongeVPN=true;
      }else{
        const aa=this.date.transform(new Date(), 'yyyy-MM-dd')
        if(aa!=null)
        this.dpVpn=new DemandeProlongationVpn(0,this.user.id,aa);
        this.uServ.createDemandeProlongeVpn(this.dpVpn).subscribe(
          res=>{
            alert("Demande de Prolongation d'accées VPN Deposée avec succées");
          this.prolongeVPN=true;
        }
      )
    }
  }else{alert("vous ne pouvez pas demander une prolongationdu d'accés Vpn maintenant attendez jusqu'à la fin du prêt");
  this.prolongeVPN=true}
  }
  
  onCalculeVPN(){
    if(this.lesAffectationsVpn.length>0){
    let today=new Date();
    let o= new Date(this.lesAffectationsVpn[0].date_fin);
    let timeDiff=  o.getTime()-today.getTime() ;
    this.daysDiffVPN=timeDiff/(1000*60*60*24);
    return this.daysDiffVPN
  }
}
  
  onUpdate(){
    this.uServ.cModifier=this.pc
    if(this.daysDiff<3){
    if(this.pc.update ){
      alert("Pc déja dans la liste des Pcs qui ont besoin de Mise à Jour");
      this.update=true
  }else{
      this.uServ.cModifier.update=true;
      this.uServ.modifyPc(this.uServ.cModifier).subscribe(
         res => {
            alert("Pc Ajouté à la liste des Pcs qui ont besoin de Mise à Jour")
            this.update=true
        }
);}
  }
else{alert("vous ne pouvez pas mettre à jour le pc maintenant attendez jusqu'à la fin du prêt");
this.update=true}}

  onDemandePC(){
   
    this.onSupprime(this.user.refusePc);
    if(this.lesAffectationsPC.length>0){
    alert("vous avez déja un pc, Vous ne pouvez pas demander un autre");
    this.demandePc=true;
  }else{
    if(this.lesDemandesPc.length>0){
      alert("vous avez déja déposer une demande de pc, Veuillez attendre SVP");
      this.demandePc=true;
    }else{
      const aa=this.date.transform(new Date(), 'yyyy-MM-dd')
      if(aa!=null)
      this.d=new DemandePc(0,this.user.id,this.user.nom,this.user.prenom,aa);
      this.uServ.createDemandePc(this.d).subscribe(res=>{
        alert("demande déposer avec succés" );
        this.demandePc=true;
      })
      }

    }
  }

onDemandeVPN(){
  this.onSupprime(this.user.refuseVpn);
  if(this.lesAffectationsVpn.length>0){
  alert("vous avez déja un accés, Vous ne pouvez pas demander un autre");
  this.demandeVPN=true;
}else{
  if(this.lesDemandesVpn.length>0){
    alert("vous avez déja déposer une demande de VPN, Veuillez attendre SVP");
    this.demandeVPN=true;
  }else{
    const aa=this.date.transform(new Date(), 'yyyy-MM-dd')
    if(aa!=null)
    this.d1=new DemandeVpn(0,this.user.id,this.user.nom,this.user.prenom,aa)
    this.uServ.createDemandeVpn(this.d1).subscribe(res=>{
      alert("demande déposer avec succés" );
      this.demandeVPN=true;
    })
  }
}
}

    }
 

