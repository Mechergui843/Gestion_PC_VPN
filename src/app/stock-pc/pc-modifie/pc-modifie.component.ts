import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { GestionService } from 'src/app/gestion.service';

@Component({
  selector: 'app-pc-modifie',
  templateUrl: './pc-modifie.component.html',
  styleUrls: ['./pc-modifie.component.css']
})
export class PcModifieComponent  implements OnInit,AfterViewInit{
  constructor(private pcServ:GestionService, private router:Router){}
  ngAfterViewInit(): void {
    let x ={
      'modele':this.pcServ.cModifier.modele,
      'ram':this.pcServ.cModifier.ram,
      'stockage':this.pcServ.cModifier.stockage,
      'processeur':this.pcServ.cModifier.processeur,
      'dispo':this.pcServ.cModifier.dispo
    }
    console.log(x,this.ff);
    setTimeout(() => {
      this.ff.setValue(x);
    });;
  }
  ngOnInit(): void {
    }
    onSubmit(){
      this.pcServ.cModifier.ram=this.ff.value.ram;
      this.pcServ.cModifier.stockage=this.ff.value.stockage;
      this.pcServ.cModifier.processeur=this.ff.value.processeur;
      this.pcServ.modifyPc(this.pcServ.cModifier)
               .subscribe(
                    res => {
                           alert("Pc modifiée")
                           this.router.navigate(["/Gestion_Pc"]);
                 },
                    err =>{
                      alert("Pc non modifiée")
                      console.log(err);
                 }
  );
  
    }
  @ViewChild('ff') ff!:NgForm;
  }
  