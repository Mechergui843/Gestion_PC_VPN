import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GestionService } from './gestion.service';
import { User } from './classes/user';
import { Pc } from './classes/pc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'gestion_pc_vpn';
  constructor(private gSer:GestionService){}
  uTab:User[]=[];
  uTab1:User[]=[];
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
  ngAfterViewInit(): void {
    
  }
  onMettreàZero(){
    debugger
    let today=new Date();
    this.gSer.getUsers().subscribe(
      data=>{
        this.uTab1=data;
        console.log(data)
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
                console.log(pc)
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
    
    
  }
}
