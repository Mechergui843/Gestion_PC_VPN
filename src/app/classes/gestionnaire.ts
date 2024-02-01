import { User } from "./user";

export class Gestionnaire {
    id:number
    nom: string;
    prenom: string;
    email: string;
    numeroCarteIdentite: string;
    motDePasse: string;
    u_demande_pc:number[];
    u_demande_vpn:number[];
    u_prolonge_pc:number[];
    u_prolonge_vpn:number[];
    constructor(id:number,nom: string,prenom: string,email: string,numeroCarteIdentite: string,motDePasse: string,d_vpn:number[],d_pc:number[],p_vpn:number[],p_pc:number[]) {
      this.id=id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.numeroCarteIdentite = numeroCarteIdentite;
      this.motDePasse = motDePasse;
      this.u_demande_vpn=d_vpn;
      this.u_demande_pc=d_pc;
      this.u_prolonge_pc=p_pc;
      this.u_prolonge_vpn=p_vpn;
    }
}
