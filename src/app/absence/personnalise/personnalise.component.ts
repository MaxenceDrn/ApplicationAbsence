import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AbsenceService} from '../../shared/absence.service';

@Component({
    selector: 'app-personnalise',
    templateUrl: './personnalise.component.html',
    styleUrls: ['./personnalise.component.css']
})
export class PersonnaliseComponent implements OnInit {
    @Input() idEtudiant;
    @Input() cours;
    public hours: string[] = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
    public minutes: string[] = ['00', '15', '30', '45'];
    protected mDebut: string;
    protected hDebut: string;
    protected mFin: string;
    protected hFin: string;
    protected dateDebutAbs;
    protected dateFinAbs;
    protected timeDebut;
    protected timeFin;
    protected selectedCours;
    public loading: boolean;
    public state: string;

    constructor(private absenceService: AbsenceService) {
    }

    public showButton() {
        return this.dateDebutAbs && this.dateFinAbs && this.hDebut && this.hFin && this.mDebut && this.mFin;
    }

    protected validDate() {
        this.timeDebut = this.hDebut + ':' + this.mDebut + ':00';
        this.timeFin = this.hFin + ':' + this.mFin + ':00';
        if (this.dateDebutAbs === this.dateFinAbs) {
            return (this.timeDebut < this.timeFin);
        } else {
            return this.dateDebutAbs < this.dateFinAbs;
        }
    }

    protected getDate(dateTime: string) {
        return dateTime.split(' ')[0];
    }

    protected filtrationCours() {
        this.selectedCours = this.cours[0].filter(cour => {
            return (this.getDate(cour.start) >= this.dateDebutAbs) && (this.getDate(cour.start) <= this.dateFinAbs);
        });

    }

    onSubmit() {
        if (this.validDate()) {
            this.filtrationCours();

            this.loading = true;
            let absReq = []
            for (let i = 0, c = this.selectedCours.length; i < c; i++) {
                absReq.push(this.selectedCours[i].id)
            }

            let request: string = JSON.stringify({
                'etudiant_id' : this.idEtudiant,
                'abs' : absReq
            });

            console.log(this.selectedCours);
            this.absenceService.addAbsenceToEtu(request)
                .subscribe(data => {
                    // @ts-ignore
                    this.state = data.message
                    this.loading = false;
                });
        }
    }

    selectDateDebutAbs(event) {
        let datePipe = new DatePipe('en-US');
        this.dateDebutAbs = datePipe.transform(event.value, 'yyyy-MM-dd');
    }

    selectDateFinAbs(event) {
        let datePipe = new DatePipe('en-US');
        this.dateFinAbs = datePipe.transform(event.value, 'yyyy-MM-dd');
    }

    selectHDebut(event) {
        this.hDebut = event;
    }

    selectMDebut(event) {
        this.mDebut = event;
    }

    selectHFin(event) {
        this.hFin = event;
    }

    selectMFin(event) {
        this.mFin = event;
    }


    ngOnInit(): void {
    }

}
