import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GestionService } from 'src/app/gestion.service';

@Component({
  selector: 'app-users-modifie',
  templateUrl: './users-modifie.component.html',
  styleUrls: ['./users-modifie.component.css']
})
export class UsersModifieComponent implements OnInit,AfterViewInit{
  constructor(private uServ:GestionService){}
  ngAfterViewInit(): void {
    let x ={
      'motDePasse':this.uServ.cModifier.motDePasse,
      'email':this.uServ.cModifier.email,
      'numeroCarteIdentite':this.uServ.cModifier.numeroCarteIdentite,
      'prenom':this.uServ.cModifier.prenom,
      'nom':this.uServ.cModifier.nom
    }
    console.log(x,this.ff);
    setTimeout(() => {
      this.ff.setValue(x);
    });;
  }
  ngOnInit(): void {
    }
    onSubmit(){
      this.uServ.cModifier.email=this.ff.value.email;
      this.uServ.cModifier.nom=this.ff.value.nom;
      this.uServ.cModifier.prenom=this.ff.value.prenom;
      this.uServ.modifyUser(this.uServ.cModifier)
               .subscribe(
                    res => {
                           alert("Utilisateur modifiée")
                 },
                    err =>{
                      alert("utilisateur non modifiée")
                 }
  );
  
    }
  @ViewChild('ff') ff!:NgForm;
  }
  
