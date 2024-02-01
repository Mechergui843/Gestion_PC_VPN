import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pc } from 'src/app/classes/pc';
import { GestionService } from 'src/app/gestion.service';

@Component({
  selector: 'app-affecte-pc',
  templateUrl: './affecte-pc.component.html',
  styleUrls: ['./affecte-pc.component.css']
})
export class AffectePcComponent implements OnInit {
  selectedOption!:Pc
  lesPcs:Pc[]=[];
  dateDeb!:string;
  dateFin!:string;
  x!:number
  fc=true;
  constructor(private pcServ:GestionService, private date:DatePipe, private router:Router){}
  ngOnInit(): void {
    this.pcServ.getPC().subscribe(data=>{this.lesPcs=data.filter((pc:Pc)=>pc.dispo==true)
      this.x=this.pcServ.cModifier.id;
      console.log(this.x);
  });
}
onAnnule(){
  this.fc=false;
}
  onAffecte(){
    this.fc=true
  this.pcServ.cModifier.id_pc=Number(this.selectedOption);
this.pcServ.logAccount.u_demande_pc = this.pcServ.logAccount.u_demande_pc.filter((id: number) => id !== this.x);

this.pcServ.modifyGestionnaire(this.pcServ.logAccount).subscribe(
  res => {
    ;
  });

  this.pcServ.modifyUser(this.pcServ.cModifier).subscribe(
    res=>{});

  let aa=this.date.transform(new Date(), 'yyyy-MM-dd')
  if(aa!=null)
    this.dateDeb=aa;
    let today=new Date();
    today.setMonth(today.getMonth()+1);
    let today1=this.date.transform(today, 'yyyy-MM-dd')
    if(today1!=null)
    this.dateFin=today1;
    this.pcServ.getPcById(Number(this.selectedOption)).subscribe(
      data => {
        if (data) {
          this.pcServ.cModifier1 = data;
          this.pcServ.cModifier1.dispo = false;
          this.pcServ.cModifier1.date_deb = this.dateDeb.toString();
          this.pcServ.cModifier1.date_fin = this.dateFin.toString();
          console.log(this.pcServ.cModifier1);
          this.pcServ.modifyPc(this.pcServ.cModifier1).subscribe(
            res => {
              alert("Pc Affecté Avec Succés");
            });
            this.router.navigate(["/Demande_Pc"]);
        }
      }
    );
    
}
  @ViewChild('ff') ff!:NgForm;

}
