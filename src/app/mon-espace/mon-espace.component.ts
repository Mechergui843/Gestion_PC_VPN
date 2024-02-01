import { Component, OnInit, ViewChild } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Pc } from '../classes/pc';
import { User } from '../classes/user';
import { Gestionnaire } from '../classes/gestionnaire';
import { Router } from '@angular/router';

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
pc!:Pc;
daysDiff!:any
daysDiffVPN!:any
id:number=Number(localStorage.getItem('id'));
lesPcs:Pc[]=[];
prolonge!:boolean;
update!:boolean
prolongeVPN!:boolean;
constructor(private uServ:GestionService,private router:Router){}
async ngOnInit(): Promise<void> {
  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="user"){
      this.router.navigate(["/Espace_User"]);
    }
  }else{this.router.navigate(["/Espace_User"]);}
  const data = await this.uServ.getPC().toPromise();
  if (data) 
    this.lesPcs = data;

  const gestionnaireData = await this.uServ.getGestionnare().toPromise();

  if (gestionnaireData && gestionnaireData.length > 0) 
    this.lesGestionnaire = gestionnaireData;

  this.user=this.uServ.logAccount;

  if(this.user.id_pc!=0)
  this.demandePc=true;

  if(this.user.vpn)
  this.demandeVPN=true

  this.ordinateur();
  
  this.prolonge=false;
  this.onCalcule();
  this.onCalculeVPN();

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
  for (let i = 0; i < this.lesPcs.length; i++) {
    if(this.user.id_pc==this.lesPcs[i].id && this.lesPcs[i].dispo==false)
    this.pc=this.lesPcs[i];
  }
}
onCalcule(){
  let today=new Date();
  let o= new Date(this.pc.date_fin);
  let timeDiff=  o.getTime()-today.getTime() ;
   this.daysDiff=timeDiff/(1000*60*60*24);
   return this.daysDiff
}
  onProlonge(){
    if(this.daysDiff<3){
      const i=this.lesGestionnaire[0].u_prolonge_pc.findIndex((u:any)=>u==this.user.id)
      if(i!=-1){
        alert("Vous avez déja déposer une demande de prolongation De Prêt");
        this.prolonge=true;
      }else{
      this.uServ.cModifier=this.lesGestionnaire[0];
      this.uServ.cModifier.u_prolonge_pc.push(this.user.id)
      this.uServ.modifyGestionnaire(this.uServ.cModifier).subscribe(
        res=>{
          alert("Demande Deposée avec succées");
          this.prolonge=true;
        }
      )
    }
  }
  }

  onProlongeVPN(){
    if(this.daysDiffVPN<3){
      const i=this.lesGestionnaire[0].u_prolonge_vpn.findIndex((u:any)=>u==this.user.id)
      if(i!=-1){
        alert("Vous avez déja déposer une demande de prolongation D'accés");
        this.prolongeVPN=true;
      }else{
      this.uServ.cModifier=this.lesGestionnaire[0];
      this.uServ.cModifier.u_prolonge_vpn.push(this.user.id)
      this.uServ.modifyGestionnaire(this.uServ.cModifier).subscribe(
        res=>{
          alert("Demande Deposée avec succées");
          this.prolongeVPN=true;
        }
      )
    }
  }
  }
  onCalculeVPN(){
    let today=new Date();
    let o= new Date(this.user.date_fin);
    let timeDiff=  o.getTime()-today.getTime() ;
    this.daysDiffVPN=timeDiff/(1000*60*60*24);
  }
  onUpdate(){
    if(this.daysDiff<3)
    this.uServ.cModifier=this.pc
    if(this.pc.update){
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

  onDemandePC(){
   
    this.onSupprime(this.user.refusePc);
    this.uServ.cModifier=this.lesGestionnaire[0];
    if(this.user.id_pc>0){
    alert("vous avez déja un pc, Vous ne pouvez pas demander un autre");
    this.demandePc=true;
  }else{
    const i =this.uServ.cModifier.u_demande_pc.findIndex((u:any)=>u==this.user.id);
    if(i>=0){
      alert("vous avez déja déposer une demande de pc, Veuillez attendre SVP");
      this.demandePc=true;
    }else{
      this.uServ.cModifier.u_demande_pc.push(this.user.id);
      this.uServ.modifyGestionnaire(this.uServ.cModifier).subscribe(
      res=>{alert("demande déposer avec succés" );
      this.demandePc=true;
      }
      )
    }
  }
}
onDemandeVPN(){
  this.onSupprime(this.user.refuseVpn);
  this.uServ.cModifier=this.lesGestionnaire[0];
  if(this.user.vpn){
  alert("vous avez déja un accés, Vous ne pouvez pas demander un autre");
  this.demandeVPN=true;
}else{
  const i =this.uServ.cModifier.u_demande_vpn.findIndex((u:any)=>u==this.user.id);
  if(i>=0){
    alert("vous avez déja déposer une demande de VPN, Veuillez attendre SVP");
    this.demandeVPN=true;
  }else{
    this.uServ.cModifier.u_demande_vpn.push(this.user.id);
    this.uServ.modifyGestionnaire(this.uServ.cModifier).subscribe(
    res=>{alert("demande déposer avec succés" );
    this.demandeVPN=true;
    }
    )
  }
}
}

    }
 

