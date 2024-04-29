import { User } from "./user";

export class Gestionnaire {
    id:number
    nom: string;
    prenom: string;
    email: string;
    numeroCarteIdentite: string;
    motDePasse: string;
    constructor(id:number,nom: string,prenom: string,email: string,numeroCarteIdentite: string,motDePasse: string) {
      this.id=id;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.numeroCarteIdentite = numeroCarteIdentite;
      this.motDePasse = motDePasse;
    }
}
