import { Component, OnInit } from '@angular/core';
import { Gestionnaire } from '../classes/gestionnaire';
import { GestionService } from '../gestion.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-espace-gestionnaire',
  templateUrl: './espace-gestionnaire.component.html',
  styleUrls: ['./espace-gestionnaire.component.css']
})
export class EspaceGestionnaireComponent implements OnInit {
  lesGestionnaire:Gestionnaire[]=[];
  constructor(public gSer:GestionService, private router:Router){}

  ngOnInit(): void {
    this.gSer.getGestionnare().subscribe(data=>{this.lesGestionnaire=data})
    }

    onSubmit(f : any){
    
      const i = this.lesGestionnaire.findIndex( (g:any) => g.email == f.email  );
      console.log(f, i);
      if( i>= 0){
        if (this.lesGestionnaire[i].motDePasse==f.password){
          localStorage.setItem('id',this.lesGestionnaire[i].id.toString());
          localStorage.setItem('etat',"gestionnaire");
          this.gSer.logAccount=this.lesGestionnaire[i];
          this.gSer.etat="gestionnaire";
          this.router.navigate(['/Gestion_Pc']);
          }else{
            alert("Mot De Passe Invalide");
          }
      }else{
        alert("adresse e-mail invalide");
      }
    }

}
