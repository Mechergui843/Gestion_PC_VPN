export class User {
    id:number;
    nom: string;
    prenom: string;
    email: string;
    numeroCarteIdentite: string;
    motDePasse: string;
    refuseVpn:string;
    refusePc:string;
  
    constructor(id:number, nom: string,prenom: string,email: string,numeroCarteIdentite: string,motDePasse: string) {
      this.id=id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.numeroCarteIdentite = numeroCarteIdentite;
      this.motDePasse = motDePasse;
      this.refusePc=""
      this.refuseVpn=""
    }
}
