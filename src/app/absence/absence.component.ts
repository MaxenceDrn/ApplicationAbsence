import {Component, OnInit} from '@angular/core';
import {DirecteurService} from '../shared/directeur.service';
import {Etudiant} from '../models/etudiant.model';
import {EtudiantService} from '../shared/etudiant.service';
import {LessonService} from '../shared/lesson.service';

@Component({
    selector: 'app-absence',
    templateUrl: './absence.component.html',
    styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
    public dept = [];
    public selectDept = 'null';
    public promo = [];
    public selectPromo;
    public name = [];
    public selectName;
    public tabEtu: Etudiant[] = [];
    public tabEtuInit: boolean = false;
    public cours: any[] = [];
    public idEtudiant: number = null;
    public loading: boolean = false;
    public coursCrenaux: any[] = [];
    public ready: boolean;


    constructor(private directeurService: DirecteurService,
                private etudiantService: EtudiantService,
                private lessonService: LessonService) {
    }

    public selectedEtu(value) {
        this.idEtudiant = value.id;
        this.cours = [];
        this.etudiantService.getAgenda(value.personne_id)
            .subscribe(data => {
                this.cours.push(data.cours);
            });

    }

    public onChangeDept(event) {
        this.selectDept = event;
        this.selectName = 'null';
        this.selectPromo = 'null';
        this.name = [];
        this.promo = [];
        this.directeurService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
    }

    public onChangePromo(event) {
        this.ready = false;
        this.selectPromo = event;
        this.selectName = null;
        this.name = [];
        this.directeurService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });
        this.directeurService.getEtuPromo(this.selectDept, event).subscribe((data) => {
            this.tabEtu = [];
            this.tabEtuInit = false;
            for (let i = 0; i < data.etu.length; i++) {
                this.tabEtu.push(Etudiant.parse(data.etu[i]));
            }
            this.tabEtuInit = true;
        });
        const request = JSON.stringify({
            'groupe' : this.selectName,
            'promo' : this.selectPromo
        })
        this.lessonService.getLesson(request)
            .subscribe(data => {
                this.coursCrenaux = [];
                // @ts-ignore
                for(let i = 0; i < data.data.length; i++){
                    // @ts-ignore
                    this.coursCrenaux.push(data.data[i]);
                }
                this.ready = true;
            })
    }

    public onChangeGroupe(event) {
        this.ready = false;
        let tmp = this.selectPromo;
        this.selectPromo = null;
        this.selectPromo = tmp
        this.selectName = event;
        this.directeurService.getEtuGroupe(this.selectDept, this.selectPromo, event).subscribe((data) => {
            this.tabEtu = [];
            this.tabEtuInit = false;
            for (let i = 0; i < data.etu.length; i++) {
                this.tabEtu.push(Etudiant.parse(data.etu[i]));
            }
            this.tabEtuInit = true;
        });
        const request = JSON.stringify({
            'groupe' : this.selectName,
            'promo' : this.selectPromo
        })
        this.lessonService.getLesson(request)
            .subscribe(data => {
                this.coursCrenaux = [];
                // @ts-ignore
                for(let i = 0; i < data.data.length; i++){
                    // @ts-ignore
                    this.coursCrenaux.push(data.data[i]);
                }
                this.ready = true;
            })
    }

    ngOnInit(): void {
        this.loading = true;
        this.directeurService.getDept().subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.dept.push(data[i].dept);
            }
            this.loading = false;
        });
        this.directeurService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
        this.directeurService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });
    }

}
