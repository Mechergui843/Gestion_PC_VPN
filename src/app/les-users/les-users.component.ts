import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';
import { Gestionnaire } from '../classes/gestionnaire';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-les-users',
  templateUrl: './les-users.component.html',
  styleUrls: ['./les-users.component.css']
})
export class LesUsersComponent implements OnInit {
  fc=false;
lesUsers:User[]=[];
gestionnaire!:Gestionnaire;
popform !: FormGroup;
popform1!:FormGroup;
user!:User
lesDemandesProlongeVpn:any;
lesDemandesProlongePc:any;
lesDemandesVpn:any;
lesDemandesPc:any;
lesAffectationsVpn:any;
lesAffectationsPC:any;
lesPcs:any;
private modalService = inject(NgbModal);
@ViewChild('pop') popRef!: TemplateRef<any>;
@ViewChild('pop1') popRef1!: TemplateRef<any>;

constructor(private uServ:GestionService, private router:Router,private formbuild : FormBuilder){}

  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}

    this.gestionnaire=this.uServ.logAccount;

  this.uServ.getUsers().subscribe(data=>{this.lesUsers=data})
  this.initForm()
}

onDeleteUser(user:User){
  this.onVerifie(user);
  this.uServ.deleteUser(user.id).subscribe(() => {
    alert("L'utilisateur a été supprimé avec succés ");
    this.ngOnInit();
    }
  );
}
onVerifie(user:User){
    const affectationsPcRequest = this.uServ.getAffectationsPc();
    const affectationsVpnRequest = this.uServ.getAffectationsVpn();
    const demandesPcRequest = this.uServ.getDemandesPc();
    const demandesVpnRequest = this.uServ.getDemandesVpn();
    const demandeProlongePcRequest = this.uServ.getDemandeProlongePc();
    const demandeProlongeVpnRequest = this.uServ.getDemandeProlongeVpn();

    forkJoin({
        affectationsPcData: affectationsPcRequest,
        affectationsVpnData: affectationsVpnRequest,
        demandesPcData: demandesPcRequest,
        demandesVpnData: demandesVpnRequest,
        demandeProlongePcData: demandeProlongePcRequest,
        demandeProlongeVpnData: demandeProlongeVpnRequest
    }).subscribe(({  affectationsPcData, affectationsVpnData, demandesPcData, demandesVpnData, demandeProlongePcData, demandeProlongeVpnData }) => {
        this.lesAffectationsPC = affectationsPcData.filter(af => af.id_user == user.id);
        console.log(this.lesAffectationsPC);
        this.lesAffectationsVpn = affectationsVpnData.filter(af => af.id_user == user.id);
        this.lesDemandesPc = demandesPcData.filter(d => d.id_user == user.id);
        this.lesDemandesVpn = demandesVpnData.filter(d => d.id_user == user.id);
        this.lesDemandesProlongePc = demandeProlongePcData.filter(d => d.id_user == user.id);
        this.lesDemandesProlongeVpn = demandeProlongeVpnData.filter(d => d.id_user == user.id);

  if(this.lesAffectationsPC!=null)
  this.uServ.deleteAffectationPc(this.lesAffectationsPC[0].id).subscribe();

  if(this.lesAffectationsVpn!=null)
  this.uServ.deleteAffectationVpn(this.lesAffectationsVpn[0].id).subscribe();

  if(this.lesDemandesPc!=null)
  this.uServ.deleteDemandePc(this.lesDemandesPc[0].id).subscribe();

  if(this.lesDemandesVpn!=null)
  this.uServ.deleteDemandeVpn(this.lesDemandesVpn[0].id).subscribe();

  if(this.lesDemandesProlongePc!=null)
  this.uServ.deleteDemandeProlongePc(this.lesDemandesProlongePc[0].id).subscribe();

  if(this.lesDemandesProlongeVpn!=null)
  this.uServ.deleteDemandeProlongeVpn(this.lesDemandesProlongeVpn[0].id).subscribe();
     })

  
}

  initForm(){ // edit
    this.popform = this.formbuild.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroCarteIdentite:['', Validators.required],
      motDePasse: ['', [Validators.required]],
    });
  }
  initForm1(){ // add
    this.popform1 = this.formbuild.group({
      id: [0, Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroCarteIdentite:['', Validators.required],
      motDePasse: ['', [Validators.required]],
      refuseVpn:[''],
      refusePc:[''],
    });
  }

  onModifie(i: User) {
    this.user = i;
    console.log(i);
    this.popform.patchValue({
      id: i.id,
      nom: i.nom,
      prenom: i.prenom,
      email: i.email,
      numeroCarteIdentite: i.numeroCarteIdentite,
      motDePasse: i.motDePasse
    });
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
  }
  

  onSubmit(){ // submit the edit
    //  const formData=this.popform.value;
    let formData : any = {
      id: this.popform.value.id,
      nom: this.popform.value.nom,
      email: this.popform.value.email,
      prenom:this.popform.value.prenom,
      numeroCarteIdentite:this.popform.value.numeroCarteIdentite,
      motDePasse:this.popform.value.motDePasse,
      refuseVpn:"",
      refusePc:""
    }
     this.uServ.modifyUser(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Mise à Jour avec Succés");
      this.ngOnInit();
     },error=>{
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      alert("Erreur lors de la mise à jour de l'utilisateur");
     })
    //  console.log(formData);
    }

  openAjout(){
    this.initForm1();
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
  }

  onAjout(){ // submit the add
    
    const formData=this.popform1.value;
    const i = this.lesUsers.findIndex( (u:any) => u.numeroCarteIdentite == formData.numeroCarteIdentite  );
    if(i!=-1){
      alert("NCIN déja existe");
    }else{
    if(this.popform1.valid){
    this.uServ.createUser(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Ajouté avec Succés");
      this.ngOnInit();
     },error=>{
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      alert("Erreur lors de l'ajout de l'utilisateur");
     })
    }
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    console.log(formData);
  }
}
}