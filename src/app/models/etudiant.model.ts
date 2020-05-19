export class Etudiant {
    id: number;
    fname: string;
    lname: string;
    personne_id: number;



    constructor(id: number, fname: string, lname: string, personne_id: number) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.personne_id = personne_id;
    }

    static parse(etu: any) {
        return new Etudiant(etu.id, etu.fname, etu.lname, etu.personne_id);
    }
}
