export class Vpn {
    id:number;
    adresse_serveur:string;
    protocole:string;
    port:number;
    pays:string
    constructor(id:number,adr:string,p:string,port:number,pays:string){
        this.adresse_serveur=adr;
        this.id=id;
        this.port=port;
        this.protocole=p;
        this.pays=pays;
    }
}
