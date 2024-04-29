export class DemandeVpn {

    id:number;
    id_user:number;
    nom_user:string;
    prenom_user:string 
    date_demande:String;
    constructor(id:number,id_user:number,nom_user:string,prenom_user:string,date_demande:String){
        this.id=id;
        this.id_user=id_user;
        this.nom_user=nom_user;
        this.prenom_user=prenom_user;
        this.date_demande=date_demande;
    }

}
