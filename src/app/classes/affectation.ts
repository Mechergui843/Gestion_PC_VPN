export class Affectation {
    id_affectataion:number;
    id_pc:number;
    id_user:number;
    id_vpn:number;

    constructor(id_user:number,id_pc:number,id_vpn:number,id:number){
        this.id_affectataion=id;
        this.id_pc=id_pc;
        this.id_vpn=id_vpn;
        this.id_user=id_user;
    }
}
