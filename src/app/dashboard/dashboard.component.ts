import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AffectationPc } from '../classes/affectation-pc';
import { HistoriqueAffectationPc } from '../classes/historique-affectation-pc';
import { GestionService } from '../gestion.service';
import Chart from 'chart.js/auto';
import { HistoriqueAffectationVpn } from '../classes/historique-affectation-vpn';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('pcAffectationChart') pcAffectationChart!: ElementRef<HTMLCanvasElement>;
  affectations: HistoriqueAffectationPc[] = [];
  monthlyAffectations: any = {};
  dataVpn:any[]=[]
  data:any[]=[]
  jan=0;Fev=0;mar=0;avr=0;mai=0;juin=0;juil=0;aout=0;sept=0;oct=0;nov=0;dec=0
  affectationsVpn:HistoriqueAffectationVpn[]=[];
  janVpn=0;FevVpn=0;marVpn=0;avrVpn=0;maiVpn=0;juinVpn=0;juilVpn=0;aoutVpn=0;septVpn=0;octVpn=0;novVpn=0;decVpn=0
  constructor(private hServ: GestionService) { }

  ngOnInit(): void {
    this.hServ.gethistAffectationPc().subscribe(data => {
      this.affectations = data;
      this.groupAffectationsByMonth();
    });

    this.hServ.gethistAffectationVpn().subscribe(data => {
      this.affectationsVpn = data;
      console.log(this.affectationsVpn)
      this.groupAffectationsByMonthVpn();
    });
  }

  groupAffectationsByMonthVpn(): void {
    this.affectationsVpn.forEach(affectation => {
      const month = new Date(affectation.date_debut).getMonth() + 1;
      console.log(month)
      switch (month){
      case 1: this.janVpn+=1;break;
      case 2: this.FevVpn+=1;break;
      case 3: this.marVpn+=1;break;
      case 4: this.avrVpn+=1;break;
      case 5: this.maiVpn+=1;break;
      case 6: this.juinVpn+=1;break;
      case 7: this.juilVpn+=1;break;
      case 8: this.aoutVpn+=1;break;
      case 9: this.septVpn+=1;break;
      case 10: this.octVpn+=1;break;
      case 11: this.novVpn+=1;break;
      case 12: this.decVpn+=1;break;
      }
    });
    this.dataVpn.push(this.janVpn,this.FevVpn,this.marVpn,this.avrVpn,this.maiVpn,this.juinVpn,this.juilVpn,this.aoutVpn,this.septVpn,this.octVpn,this.novVpn,this.decVpn);
  }


  groupAffectationsByMonth(): void {
    
    this.affectations.forEach(affectation => {
      const month = new Date(affectation.date_debut).getMonth() + 1;
      console.log(month)
      switch (month){
      case 1: this.jan+=1;break;
      case 2: this.Fev+=1;break;
      case 3: this.mar+=1;break;
      case 4: this.avr+=1;break;
      case 5: this.mai+=1;break;
      case 6: this.juin+=1;break;
      case 7: this.juil+=1;break;
      case 8: this.aout+=1;break;
      case 9: this.sept+=1;break;
      case 10: this.oct+=1;break;
      case 11: this.nov+=1;break;
      case 12: this.dec+=1;break;
      }
    });
    this.data.push(this.jan,this.Fev,this.mar,this.avr,this.mai,this.juin,this.juil,this.aout,this.sept,this.oct,this.nov,this.dec);
  }
  ngAfterViewInit() {

      const ref = document.getElementById('chart');

      let canvas = document.createElement('canvas');
      ref?.appendChild(canvas);
    this.renderChart(canvas);
      

}

  renderChart(zone : HTMLCanvasElement): void {
   // const ctx = this.pcAffectationChart.nativeElement.getContext('2d');
   // if (ctx) {
      new Chart(zone, {
        type: 'bar',
        data: {
          labels:["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre" , "Décembre"],
          datasets: [{
            label: 'Affectations de PC par mois',
            data: this.data,//Object.values(this.monthlyAffectations),
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1
          },{
            label: 'Affectations de VPN par mois',
            data: this.dataVpn,//Object.values(this.monthlyAffectations),
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              min: 0,
              display: 'auto',
            }
          }
        }
      });
    /*} else {
      console.error('Cannot get context for canvas');
    }*/
  }
  
  hasMonthlyAffectations(): boolean {
    return this.monthlyAffectations && Object.keys(this.monthlyAffectations).length > 0;
  }
  

}
