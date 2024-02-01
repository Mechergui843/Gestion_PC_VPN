import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { GestionService } from '../gestion.service';

@Component({
  selector: 'app-espace-user',
  templateUrl: './espace-user.component.html',
  styleUrls: ['./espace-user.component.css']
})
export class EspaceUserComponent implements OnInit {
lesUsers:User[]=[];
constructor(private router:Router,private uServ:GestionService){}
async ngOnInit(): Promise <void> {
  const data =await this.uServ.getUsers().toPromise();
  this.lesUsers=data || [];
  /*this.uServ.getUsers().subscribe(data=>{this.Users=data})*/
}
onSubmit(f:any){
  
  const i=this.lesUsers.findIndex((u:any)=>u.email==f.email);
  console.log(i);
  if(i>=0){
    if(this.lesUsers[i].motDePasse==f.password){
      localStorage.setItem("id",this.lesUsers[i].id.toString());
      localStorage.setItem("etat","user");
      this.uServ.logAccount=this.lesUsers[i];
      this.uServ.etat="user";
      this.router.navigate(["/Mon_Espace"]);
    }else{
      alert("Mot De Passe Invalide");
    }
  }
    else{
      alert("adresse e-mail invalide");
    }
  }
}
