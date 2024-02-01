import { Component } from '@angular/core';
import { GestionService } from '../gestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public gSer:GestionService,private router:Router){}
  logout(){
    let x=localStorage.getItem("etat");
    localStorage.clear();
    this.gSer.logAccount = null;
    this.gSer.etat = null;
    if(x=="gestionnaire")
    this.router.navigate(['/Espace_Gestionnaire']);
  else
  this.router.navigate(["/Espace_User"]);
  }

}
