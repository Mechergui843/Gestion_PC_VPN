import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';
import { User } from '../classes/user';
import { Route, Router } from '@angular/router';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Pc } from '../classes/pc';
import { AffectationPc } from '../classes/affectation-pc';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demande-pc',
  templateUrl: './demande-pc.component.html',
  styleUrls: ['./demande-pc.component.css']
})
export class DemandePcComponent implements OnInit{
gestionnaire!:Gestionnaire;
user!:any;
d1!:any
demande:any[]=[];
dateDeb!:string;
  dateFin!:string;
fc=false;
popform !: FormGroup;
lesPcs!:Pc[];
private modalService = inject(NgbModal);
@ViewChild('pop') popRef!: TemplateRef<any>;
refuse="Votre Demande De PC est Refusé car : ";


constructor(private pcServ:GestionService,private router:Router,private formbuild : FormBuilder,private date:DatePipe){}
ngOnInit(): void {
  this.pcServ.getPC().subscribe(data=>{this.lesPcs=data.filter(pc=>pc.dispo!=false)})

  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="gestionnaire"){
      this.router.navigate(["/Espace_Gestionnaire"]);
    }
  }else{this.router.navigate(["/Espace_Gestionnaire"]);}

  this.pcServ.getDemandesPc().subscribe(data=>{this.demande=data})

  this.pcServ.getGestionnaireById(Number(localStorage.getItem("id"))).subscribe(
    gestionnaire => {
      this.gestionnaire = gestionnaire;
      //this.users();
    });
    this.initForm();  
}

/*
users(){
  for (let i = 0; i < this.lesUsers.length; i++) {
    const x =this.gestionnaire.u_demande_pc.findIndex((u:any)=>u==this.lesUsers[i].id); 
    if(x!=-1)
    this.demande.push(this.lesUsers[i]);
  }
  this.demande.forEach(element => {
  })
}*/
  async onRefuse(u:any){
  this.refuse+=window.prompt("Donner la Cause De Refuse:");
  this.demande=this.demande.filter((us:User)=>us.id!=u.id)
  this.user=await this.pcServ.getUserById(Number(u.id_user)).toPromise()
  this.user.refusePc=this.refuse;
  this.pcServ.modifyUser(this.user).subscribe({}) 
    this.pcServ.deleteDemandePc(u.id).subscribe(
      res=>{})
      this.router.navigate(["/Demande_Pc"]);
}

initForm(){ // edit
  this.popform = this.formbuild.group({
    id_user: ['', Validators.required],
    id_pc: ['', Validators.required],
  });
}
openAjout(i:any){
  this.popform.patchValue({
    id_user:i.id_user
  })
  this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
}

async onSubmit() {
  let aa = this.date.transform(new Date(), 'yyyy-MM-dd');
  if (aa != null)
    this.dateDeb = aa;
  
  let today = new Date();
  today.setMonth(today.getMonth() + 1);
  let today1 = this.date.transform(today, 'yyyy-MM-dd');
  if (today1 != null)
    this.dateFin = today1;

  let formData: AffectationPc = {
    id: 0,
    id_pc: Number(this.popform.value.id_pc),
    id_user: this.popform.value.id_user,
    date_debut: this.dateDeb.toString(),
    date_fin: this.dateFin.toString()
  };

  this.pcServ.createAffectationPc(formData).subscribe(
    res => {
      alert("Pc affecté avec succés!");
      this.modalService.dismissAll();
    }
  );
  this.pcServ.createHistAffectationPc(formData).subscribe(
    res => {
    }
  );

  this.pcServ.getPcById(Number(this.popform.value.id_pc)).subscribe(pc => {
    this.pcServ.cModifier = pc;

    // Make the necessary updates
    this.pcServ.cModifier.dispo = false;

    // Modify the PC in the database
    this.pcServ.modifyPc(this.pcServ.cModifier).subscribe(res => {
    }, error => {
      console.error("Error updating PC:", error);
    });
  }, error => {
    console.error("Error fetching PC:", error);
  });

 await this.pcServ.getDemandesPc().subscribe(res => {
    const demands = res.filter(d2 => d2.id_user == formData.id_user);
    
    if (demands.length > 0) {
      console.log(demands);
      this.pcServ.cModifier1 = demands[0];
      console.log(this.pcServ.cModifier1);

      this.pcServ.deleteDemandePc(Number(this.pcServ.cModifier1.id)).subscribe(
        res => { this.ngOnInit(); },
        error => { console.error("Error deleting demande:", error); }
        
      );
    }
  });

  
}

}
