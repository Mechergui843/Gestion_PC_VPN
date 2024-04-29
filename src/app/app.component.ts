import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GestionService } from './gestion.service';
import { User } from './classes/user';
import { Pc } from './classes/pc';
import { AffectationPc } from './classes/affectation-pc';
import { AffectationVpn } from './classes/affectation-vpn';
import { forkJoin } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gestion_pc_vpn';
  constructor(private gSer:GestionService){}
  uTab:User[]=[];
  uTab1:User[]=[];
  afPc!:AffectationPc[];
  afVpn!:AffectationVpn[];
  pc!:Pc

  ngOnInit(): void {
    
    this.onMettreàZero();
    if(localStorage.getItem('id')){
      if(localStorage.getItem('etat')=='user'){
        this.gSer.getUsers().subscribe(data=>{
          this.uTab = data;
          const i=this.uTab.findIndex((u:any)=> u.id == localStorage.getItem('id') );
          this.gSer.logAccount=this.uTab[i];
          this.gSer.etat="user";
          
        })
      }else if(localStorage.getItem('etat')=='gestionnaire') {
        this.gSer.getGestionnare().subscribe(data=>{ 
          const i=data.findIndex(c=> c.id.toString() == localStorage.getItem('id') );
          this.gSer.logAccount=data[i];
          this.gSer.etat="gestionnaire";
        }) 
      }
    }
     
  }

  onMettreàZero() {
    let today = new Date();

    forkJoin({
      affectationsPc: this.gSer.getAffectationsPc(),
      affectationsVpn: this.gSer.getAffectationsVpn()
    }).subscribe(({ affectationsPc, affectationsVpn }) => {
      this.afPc = affectationsPc;
      this.afVpn = affectationsVpn;
      
      console.log(this.afPc);
      console.log(this.afVpn);

      if (this.afPc) {
        for (let i = 0; i < this.afPc.length; i++) {
          let finalDay = new Date(this.afPc[i].date_fin).getTime();
          if (today.getTime() >= finalDay){
          this.gSer.getPcById(this.afPc[i].id_pc).subscribe(res=>{this.pc=res});
          this.pc.dispo=true;
          this.gSer.modifyPc(this.pc).subscribe();
            this.gSer.deleteAffectationPc(this.afPc[i].id).subscribe();      
        }
      }
      }

      if (this.afVpn) {
        for (let i = 0; i < this.afVpn.length; i++) {
          let finalDay = Date.parse(this.afVpn[i].date_fin.toString());
          if (today.getTime() >= finalDay)
              this.gSer.deleteAffectationVpn(this.afVpn[i].id).subscribe();
        }
      }
    });
  }

  



    /*
    this.gSer.getUsers().subscribe(
      data=>{
        this.uTab1=data;
        this.uTab1.forEach(element => {
          let finalDay=new Date(element.date_fin).getTime();
          if(today.getTime()>=finalDay){
            element.date_deb="";
            element.date_fin="";
            element.vpn=false;
            console.log(element);
            this.gSer.modifyUser(element).subscribe();
          }
          if(element.id_pc>0){
            this.gSer.getPcById(element.id_pc).subscribe(
              res=>{
                element.id_pc=0;
                let pc=res;
                let finalDayPc=new Date(pc.date_fin).getTime();
                if(finalDayPc<=today.getTime()){
                  pc.date_deb="";
                  pc.date_fin=""
                  pc.dispo=true;
                  this.gSer.modifyPc(pc).subscribe()
                  this.gSer.modifyUser(element).subscribe()
                }
              }
            )
          }
        });
      }
    )
    */
    
  }
