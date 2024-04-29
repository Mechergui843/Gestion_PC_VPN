export class Pc {
    id:number;
    modele:string;
    ram:number;
    stockage:number;
    processeur:string;
    dispo:boolean
    update:boolean
    constructor(id:number,modele:string,ram:number,stockage:number,processeur:string,dispo:boolean,upd:boolean){
        this.id=id;
        this.modele=modele;
        this.ram=ram;
        this.stockage=stockage;
        this.processeur=processeur;
        this.dispo=dispo;
        this.update=upd
    }
}
