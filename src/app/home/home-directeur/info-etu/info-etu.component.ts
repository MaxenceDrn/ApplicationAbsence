import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {delay} from 'rxjs/operators';
import {AbsenceService} from '../../../shared/absence.service';
import {EtudiantService} from '../../../shared/etudiant.service';

@Component({
    selector: 'app-info-etu',
    templateUrl: './info-etu.component.html',
    styleUrls: ['./info-etu.component.css'],
})
export class InfoEtuComponent implements OnInit {
    public loading;
    public loading1;
    public loading2;
    public loading3;
    public id = this.route.snapshot.paramMap.get('id');

    public personne;
    public nbAbs;
    public nbHAbs;
    public absParModule;
    public reload;

    public displayedColumns = ['Début', 'Fin', 'Etat', 'Durée', 'Type', 'Justificatif', 'Modifier', 'Supprimer'];

    public supprimerAbs(value) {
        console.log(value);
        this.reload = true;
        const rep = this.AbsenceService.deleteAbs(value[1], value[0]).subscribe(() => {
            this.getNbAbs();
            this.getAbsParModule();
            this.getnbHAbs();
            this.getEtuById();
            this.reload = false;
        });
    }

    public getNbAbs() {
        this.loading1 = true;
        this.EtudiantService.getNbAbs(this.id).subscribe((data) => {
            this.nbAbs = data;
            this.loading1 = false;
        });
    }

    public getnbHAbs() {
        this.loading2 = true;
        this.EtudiantService.getNbHAbs(this.id).subscribe((data) => {
            this.nbHAbs = data;
            this.loading2 = false;
        });
    }

    public getAbsParModule() {
        this.loading3 = true;
        this.EtudiantService.getAbsModule(this.id).subscribe((data) => {
            console.log(data);
            this.absParModule = data;
            this.loading3 = false;
        });
    }

    public getEtuById() {
        this.loading = true;
        this.EtudiantService.getEtuById(this.id).subscribe((data) => {
            this.personne = data;
            this.loading = false;
        });
    }

    public openJusti(event) {
        const url = 'http://localhost:8000/api/getAbs/' + this.id + '/' + event;
        window.open(url, "_blank");
    }

    constructor(private route: ActivatedRoute, private EtudiantService: EtudiantService, private AbsenceService: AbsenceService) {
    }

    public ngOnInit(): void {
        this.getNbAbs();
        this.getAbsParModule();
        this.getnbHAbs();
        this.getEtuById();

    }
}
