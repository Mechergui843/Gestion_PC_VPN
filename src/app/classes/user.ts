export class User {
    id:number;
    nom: string;
    prenom: string;
    email: string;
    numeroCarteIdentite: string;
    id_pc:number;
    vpn:boolean
    date_deb:string;
    date_fin:string;
    motDePasse: string;
    refuseVpn:string;
    refusePc:string;
  
    constructor(id:number,id_pc:number, nom: string,prenom: string,email: string,numeroCarteIdentite: string,motDePasse: string,vpn:boolean,date_d:string,date_f:string) {
      this.id=id;
      this.id_pc=id_pc;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.date_deb=date_d;
      this.date_fin=date_f;
      this.vpn=vpn;
      this.numeroCarteIdentite = numeroCarteIdentite;
      this.motDePasse = motDePasse;
      this.refusePc=""
      this.refuseVpn=""
    }
}
