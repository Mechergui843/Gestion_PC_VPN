import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.css']
})
export class AjoutUserComponent implements OnInit {
  lesUsers:User[]=[];
  constructor(private uServ:GestionService,private router:Router){}
ngOnInit(): void {
  if(localStorage.getItem("etat")){
    if(localStorage.getItem("etat")!="gestionnaire"){
      this.router.navigate(["/Espace_Gestionnaire"]);
    }
  }else{this.router.navigate(["/Espace_Gestionnaire"]);}
  this.uServ.getUsers().subscribe(data=>{this.lesUsers=data})
}
onAjout(ff:any){
  if(ff.nom!="" && ff.prenom!="" && ff.email!="" && ff.numeroCarteIdentite!="" && ff.motDePasse!=""){
    const i = this.lesUsers.findIndex( (u:any) => u.numeroCarteIdentite == ff.numeroCarteIdentite  );
    if(i<0){
  let u=new User(ff.id,0,ff.nom,ff.prenom,ff.email,ff.numeroCarteIdentite,ff.motDePasse,false,"","");
  this.uServ.createUser(u as User).subscribe(
    data=>{
      this.lesUsers.push(data);
      alert("Utilisateur ajouté avec succés");
      this.router.navigate(["/Gestion_User"]);
    }
  );
  }else{
    alert("Utilisateur existe déja ");
  }
}else{
    alert("tous les champs doivent Etre non vide");
  }
}
}
