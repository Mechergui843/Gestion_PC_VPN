import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gestionnaire } from './classes/gestionnaire';
import { User } from './classes/user';
import { Affectation } from './classes/affectation';
import { Pc } from './classes/pc';
import { Vpn } from './classes/vpn';
const urlGestionnaire="gestionnaire";
const urlUser="/user";
const urlAffectation="/affectation";
const urlPc="/pc";
const urlVpn="/vpn";
@Injectable({
  providedIn: 'root'
})
export class GestionService {
  logAccount:any;
  etat:any;
  cModifier:any;
  cModifier1:any;
  constructor(private http:HttpClient) { }
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
  getPcById(id:any):Observable<Pc>
  {
    return this.http.get<Pc>(urlPc+"/"+id);
  }
  modifyPc(pc: Pc): Observable<Pc> {
    return this.http.put<Pc>(urlPc+"/"+pc.id,pc);
  }
  createPc(pc:Pc): Observable<Pc> {
    return this.http.post<Pc>(urlPc,pc);
  }

  getVpn():Observable<Vpn[]>
  { return this.http.get<Vpn[]>(urlVpn);
  };

}
