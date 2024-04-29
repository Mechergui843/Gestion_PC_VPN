import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GestionService } from '../gestion.service';
import { Pc } from '../classes/pc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-pc',
  templateUrl: './stock-pc.component.html',
  styleUrls: ['./stock-pc.component.css']
})
export class StockPcComponent implements OnInit {
  fc=false;
lesPc:Pc[]=[];
private modalService = inject(NgbModal);
@ViewChild('pop') popRef!: TemplateRef<any>;
@ViewChild('pop1') popRef1!: TemplateRef<any>;
popform !: FormGroup;
popform1!:FormGroup;
constructor(private pcServ:GestionService, private router:Router,private formbuild : FormBuilder){}
  ngOnInit(): void {
    if(localStorage.getItem("etat")){
      if(localStorage.getItem("etat")!="gestionnaire"){
        this.router.navigate(["/Espace_Gestionnaire"]);
      }
    }else{this.router.navigate(["/Espace_Gestionnaire"]);}

  this.pcServ.getPC().subscribe(data=>{this.lesPc=data})
  this.initForm()
}


onDeletePc(pc:Pc){
  if(pc.dispo==false){
    alert("vous ne pouvez pas supprimer un pc en prêt");
    return 
  }
  this.pcServ.deletePc(pc.id).subscribe(
    () => {
      this.ngOnInit()
      
    },
  );
}
onMAJ(i:Pc){
  if(i.dispo==false){
    alert("Vous ne Pouvez Pas Mettre à Jour un Pc en Prêt");
  }else{
  i.update=false
this.pcServ.modifyPc(i).subscribe(
  res=>{alert("Pc Mis à Jour")}
)}
}
onModifie(i:any){
  if(i.dispo==false){
    alert("Vous ne Pouvez Pas Modifier un Pc en Prêt");
  }else{
      const pc = i;
      console.log(i);
      this.popform.patchValue({
        id: i.id,
        modele: i.modele,
        ram: i.ram,
        stockage: i.stockage,
        processeur: i.processeur,
      });
      this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    }
  }

  initForm(){ // edit
    this.popform = this.formbuild.group({
      id: ['', Validators.required],
      modele: ['', Validators.required],
      ram: ['', Validators.required],
      stockage: ['', Validators.required],
      processeur:['', Validators.required],
    });
  }
  initForm1(){ // add
    this.popform1 = this.formbuild.group({
      id: [0, Validators.required],
      modele: ['', Validators.required],
      ram: ['', Validators.required],
      stockage: ['', Validators.required],
      processeur:['', Validators.required],
      dispo:[true],
      update:[false]
    });
  }

  onSubmit(){ // submit the edit
    //  const formData=this.popform.value;
    let formData : any = {
      id: this.popform.value.id,
      modele: this.popform.value.modele,
      ram: this.popform.value.ram,
      stockage:this.popform.value.stockage,
      processeur:this.popform.value.processeur,
      dispo:true,
      update:false
    }
     this.pcServ.modifyPc(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Mise à Jour avec Succés");
      this.ngOnInit();
     },error=>{
      console.error('Erreur lors de la mise à jour du Pc :', error);
      alert("Erreur lors de la mise à jour du Pc");
     })
    }

    openAjout(){
      this.initForm1();
      this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    }

    onAjout(){ // submit the add
    
      const formData=this.popform1.value;
      if(this.popform1.valid){
      this.pcServ.createPc(formData).subscribe(()=>{
        this.modalService.dismissAll();
        console.log("Ajouté avec Succés");
        this.ngOnInit();
       },error=>{
        console.error('Erreur lors de l\'ajout du Pc :', error);
        alert("Erreur lors de l'ajout du Pc");
       })
      }
      this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
      console.log(formData);
      this.ngOnInit()
    }


}
