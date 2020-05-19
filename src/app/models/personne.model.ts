import {User} from './user.model';

export class Personne {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    cp: number;
    ville: string;
    telephone: string;
    email: string;
    role: string;
    user: User;


    constructor(id: number, nom: string, prenom: string, dateNaissance: string, adresse: string,
                cp: number, ville: string, telephone: string, email: string, role: string, user: User) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adresse = adresse;
        this.cp = cp;
        this.ville = ville;
        this.telephone = telephone;
        this.email = email;
        this.role = role;
        this.user = user;
    }

    static parse(personne: any) {
        const user = new User(personne.id, personne.nom + ' ' + personne.prenom, personne.email, personne.role);
        const pers = new Personne(personne.id, personne.nom, personne.prenom, personne.dateNaissance, personne.adresse,
            personne.cp, personne.ville, personne.telephone, personne.email, personne.role, user);
        return pers;
    }
}
