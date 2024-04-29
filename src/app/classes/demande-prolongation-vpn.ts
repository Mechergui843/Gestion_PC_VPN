export class DemandeProlongationVpn {
    id:number;
    id_user:number;
    date_demande:string;
    constructor(id:number,id_user:number,date_demande:string){
        this.id=id;
        this.id_user=id_user;
        this.date_demande=date_demande;
    }
}
