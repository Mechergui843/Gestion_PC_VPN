export class AffectationPc {
    id:number;
    id_pc:number;
    id_user:number;
    date_debut:string;
    date_fin:string

    constructor(id:number,id_pc:number,id_user:number,date_debut:string,date_fin:string){
        this.id=id;
        this.id_pc=id_pc;
        this.id_user=id_user;
        this.date_debut=date_debut;
        this.date_fin=date_fin;
    }
}
