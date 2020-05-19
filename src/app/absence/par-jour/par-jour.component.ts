import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AbsenceService} from '../../shared/absence.service';

@Component({
    selector: 'app-par-jour',
    templateUrl: './par-jour.component.html',
    styleUrls: ['./par-jour.component.css']
})
export class ParJourComponent implements OnInit {
    @Input() cours;
    @Input() idEtudiant;

    public date;
    public selectedCours: any[];
    public loading;
    public state: string;

    constructor(private absenceService: AbsenceService) {
    }

    pickDate(event: MatDatepickerInputEvent<any>) {
        let datePipe = new DatePipe('en-US');
        this.date = datePipe.transform(event.value, 'yyyy-MM-dd ');

        this.selectedCours = this.cours[0].filter(cour => cour.start.includes(this.date));

        //console.log(this.cours[0][0].start);
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.loading = true;
        let absReq = [];
        for (let i = 0, c = this.selectedCours.length; i < c; i++) {
            absReq.push(this.selectedCours[i].id)
        }

        const request = JSON.stringify({
            etudiant_id: this.idEtudiant,
            abs: absReq
        });

        this.absenceService.addAbsenceToEtu(request)
            .subscribe(data => {
                // @ts-ignore
                this.state = data.message;
                this.loading = false;
            });


    }

}
