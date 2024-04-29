import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gestionnaire } from './classes/gestionnaire';
import { User } from './classes/user';
import { Pc } from './classes/pc';
import { AffectationPc } from './classes/affectation-pc';
import { AffectationVpn } from './classes/affectation-vpn';
import { DemandePc } from './classes/demande-pc';
import { DemandeVpn } from './classes/demande-vpn';
import { DemandeProlongationPc } from './classes/demande-prolongation-pc';
import { DemandeProlongationVpn } from './classes/demande-prolongation-vpn';
import { HistoriqueAffectationPc } from './classes/historique-affectation-pc';
import { HistoriqueAffectationVpn } from './classes/historique-affectation-vpn';
const urlGestionnaire="http://localhost:3000/gestionnaire";
const urlUser="http://localhost:3000/user";
const urlPc="http://localhost:3000/pc";
const urlAffPc="http://localhost:3000/affectation_pc";
const urlAffVpn="http://localhost:3000/affectation_vpn";
const urlDemandePc="http://localhost:3000/demande_pc";
const urlDemandeVpn="http://localhost:3000/demande_vpn";
const urlDemandeProlongePc="http://localhost:3000/demande_prolonge_pc"
const urlDemandeProlongeVpn=" http://localhost:3000/demande_prolonge_vpn"
const urlHistAffPc="http://localhost:3000/historique_affectation_pc";
const urlHistAffVpn="http://localhost:3000/historique_affectation_vpn";
@Injectable({
  providedIn: 'root'
})
export class GestionService {
  logAccount:any;
  etat:any;
  cModifier:any;
  cModifier1:any;
  affectPc!:AffectationPc;
  constructor(private http:HttpClient) { }

  //Crud Historique affectation Pc 
gethistAffectationPc():Observable<HistoriqueAffectationPc[]>{
  return this.http.get<HistoriqueAffectationPc[]>(urlHistAffPc); 
}
createHistAffectationPc(dp: AffectationPc): Observable<AffectationPc> {
  return this.http.post<AffectationPc>(urlHistAffPc,dp);
}
//crud Historique affectation Vpn

gethistAffectationVpn():Observable<HistoriqueAffectationVpn[]>{
  return this.http.get<HistoriqueAffectationVpn[]>(urlHistAffVpn);
}
createHistAffectationVpn(dp: AffectationVpn): Observable<AffectationVpn> {
  return this.http.post<AffectationVpn>(urlHistAffVpn,dp);
}

//Crud demande Prolongation Pc 
getDemandeProlongePc():Observable<DemandeProlongationPc[]>{
  return this.http.get<DemandeProlongationPc[]>(urlDemandeProlongePc);
}
deleteDemandeProlongePc(id:number ){
  return this.http.delete(urlDemandeProlongePc+"/"+id);
}
createDemandeProlongePc(dp: DemandeProlongationPc): Observable<DemandeProlongationPc> {
  return this.http.post<DemandeProlongationPc>(urlDemandeProlongePc,dp);
}
modifyDemandeProlongePc(dp: DemandeProlongationPc): Observable<DemandeProlongationPc> {
  return this.http.put<DemandeProlongationPc>(urlDemandeProlongePc+"/"+dp.id,dp);
}

//Crud demande Prolongation Vpn

getDemandeProlongeVpn():Observable<DemandeProlongationVpn[]>{
  return this.http.get<DemandeProlongationVpn[]>(urlDemandeProlongeVpn);
}
deleteDemandeProlongeVpn(id:number ){
  return this.http.delete(urlDemandeProlongeVpn+"/"+id);
}
createDemandeProlongeVpn(dp: DemandeProlongationVpn): Observable<DemandeProlongationVpn> {
  return this.http.post<DemandeProlongationVpn>(urlDemandeProlongeVpn,dp);
}

//Crud affectation Pc
getAffectationsPc():Observable<AffectationPc[]>{
  return this.http.get<AffectationPc[]>(urlAffPc);
}
deleteAffectationPc(id:number ){
  return this.http.delete(urlAffPc+"/"+id);
}
modifyAffectationPc(af: AffectationPc): Observable<AffectationPc> {
  return this.http.put<AffectationPc>(urlAffPc+"/"+af.id,af);
}
createAffectationPc(af: AffectationPc): Observable<AffectationPc> {
  return this.http.post<AffectationPc>(urlAffPc,af);
}

//Crud Demande Pc

getDemandesPc():Observable<DemandePc[]>{
  return this.http.get<DemandePc[]>(urlDemandePc);
}
deleteDemandePc(id:number ){
  return this.http.delete(urlDemandePc+"/"+id);
}
modifyDemandePc(d: DemandePc): Observable<DemandePc> {
  return this.http.put<DemandePc>(urlDemandePc+"/"+d.id,d);
}
createDemandePc(d: DemandePc): Observable<DemandePc> {
  return this.http.post<DemandePc>(urlDemandePc,d);
}

//Crud demande Vpn

getDemandesVpn():Observable<DemandeVpn[]>{
  return this.http.get<DemandeVpn[]>(urlDemandeVpn);
}
deleteDemandeVpn(id:number ){
  return this.http.delete(urlDemandeVpn+"/"+id);
}
modifyDemandeVpn(d: DemandeVpn): Observable<DemandeVpn> {
  return this.http.put<DemandeVpn>(urlDemandeVpn+"/"+d.id,d);
}
createDemandeVpn(d: DemandeVpn): Observable<DemandeVpn> {
  return this.http.post<DemandeVpn>(urlDemandeVpn,d);
}

//Crud affectation VPN

createAffectationVpn(af: AffectationVpn): Observable<AffectationVpn> {
  return this.http.post<AffectationVpn>(urlAffVpn,af);
}

getAffectationsVpn():Observable<AffectationVpn[]>{
  return this.http.get<AffectationVpn[]>(urlAffVpn);
}
deleteAffectationVpn(id:number ){
  return this.http.delete(urlAffVpn+"/"+id);
}
modifyAffectationVpn(af: AffectationVpn): Observable<AffectationVpn> {
  return this.http.put<AffectationVpn>(urlAffVpn+"/"+af.id,af);
}

  getUsers():Observable<User[]>
  { return this.http.get<User[]>(urlUser);
  };
  getUserById(id:any):Observable<User>
  { 
    return this.http.get<User>(urlUser+"/"+id);
  };
  createUser(u: User): Observable<User> {
    return this.http.post<User>(urlUser,u);
  }
  deleteUser(id:number ){
    return this.http.delete(urlUser+"/"+id);
  }
  modifyUser(u: User): Observable<User> {
    return this.http.put<User>(urlUser+"/"+u.id,u);
  }
  getGestionnare():Observable<Gestionnaire[]>
  { return this.http.get<Gestionnaire[]>(urlGestionnaire);
  }
  getGestionnaireById(id:number):Observable<Gestionnaire>
  { 
    return this.http.get<Gestionnaire>(urlGestionnaire+"/"+id);
  };
  modifyGestionnaire(g: Gestionnaire): Observable<Gestionnaire> {
    return this.http.put<Gestionnaire>(urlGestionnaire+"/"+g.id,g);
  }
  getOrdinateur(id:number): Observable<Pc> {
    return this.http.get<any>(urlUser+"/"+id).pipe(
      map((user) => user.pc || []))
    };
    deletePc(id:number ){
      return this.http.delete(urlPc+"/"+id);
    }
  getPC():Observable<Pc[]>
  { return this.http.get<Pc[]>(urlPc);
  }
  getPcById(id:Number):Observable<Pc>
  {
    return this.http.get<Pc>(urlPc+"/"+id);
  }
  modifyPc(pc: Pc): Observable<Pc> {
    return this.http.put<Pc>(urlPc+"/"+pc.id,pc);
  }
  createPc(pc:Pc): Observable<Pc> {
    return this.http.post<Pc>(urlPc,pc);
  }

}
