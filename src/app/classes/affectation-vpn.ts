export class AffectationVpn {
    id:number;
    id_user:number;
    date_debut:String;
    date_fin:String

    constructor(id:number,id_user:number,date_debut:String,date_fin:String){
        this.id=id;
        this.id_user=id_user;
        this.date_debut=date_debut;
        this.date_fin=date_fin;
    }
}

