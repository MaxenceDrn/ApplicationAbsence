import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbsenceService} from '../../../../shared/absence.service';
import {Etudiant} from '../../../../models/etudiant.model';
import {EtudiantService} from '../../../../shared/etudiant.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-edit-multi-abs',
    templateUrl: './edit-multi-abs.component.html',
    styleUrls: ['./edit-multi-abs.component.css']
})
export class EditMultiAbsComponent implements OnInit {
    public etats = ['Validee', 'NonValidee', 'Etude'];
    public reason = '';
    public etat = '';
    public idEtu = this.route.snapshot.paramMap.get('idEtu');
    public idLes = this.route.snapshot.paramMap.get('idLes');
    public loadingEtu: boolean;
    public loadingAbs: boolean;
    public tabAbs: any[];
    public tabEtat: string[] = ['Validee', 'NonValidee'];
    public currentEtu: Etudiant;
    public title = 'dropzone';
    public files: File[] = [];
    private dateDebutJusti: string;
    private dateFinJusti: string;

    constructor(private absenceService: AbsenceService, private route: ActivatedRoute, private etudiantService: EtudiantService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadingEtu = true;
        this.loadingAbs = true;
        this.etudiantService.getEtuById(this.idEtu)
            .subscribe(
                data => {
                    this.currentEtu = Etudiant.parse(data[0]);
                    this.loadingEtu = false;
                }
            );
        this.absenceService.getAllAbs(+this.idEtu)
            .subscribe(
                data => {
                    this.tabAbs = data;
                    this.loadingAbs = false;
                }
            );
    }

    selectDateDebutJusti(event) {
        let datePipe = new DatePipe('en-US');
        this.dateDebutJusti = datePipe.transform(event.value, 'yyyy-MM-dd');
    }

    selectDateFinJusti(event) {
        let datePipe = new DatePipe('en-US');
        this.dateFinJusti = datePipe.transform(event.value, 'yyyy-MM-dd');
        this.filtrationCours();
    }

    protected getDate(dateTime: string) {
        return dateTime.split(' ')[0];
    }

    protected filtrationCours() {
        this.tabAbs = this.tabAbs.filter(abs => {
            return (this.getDate(abs.start) >= this.dateDebutJusti) && (this.getDate(abs.start) <= this.dateFinJusti);
        });

    }

    public onSelect(event) {
        this.files.push(event.addedFiles[0]);
    }

    public onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    public reasonChange(event) {
        this.reason = event.target.value;
    }

    public etatChange(event) {
        this.etat = event;
    }

    public modifierAbs() {
        if (this.reason == '') {
            this.reason = 'Inconnue';
        }
        if (this.etat == '') {
            this.etat = 'Etude';
        }
        let tabIdLes: number[] = []
        this.tabAbs.forEach(abs => {tabIdLes.push(+abs.lesson_id)})
        // @ts-ignore
        const data: FormData = new FormData();
        data.append('idEtu', this.idEtu);
        // @ts-ignore
        data.append('tabLes', tabIdLes);
        data.append('etat', this.etat);
        data.append('reason', this.reason);
        data.append('_method', 'PUT');
        data.append('file', this.files[0], this.files[0].name);
        this.absenceService.editMultiAbs(data)
            .subscribe((res) => {
                this.router.navigate(['homeDir', this.idEtu]);
            });
    }


}
