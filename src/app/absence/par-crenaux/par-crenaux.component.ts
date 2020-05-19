import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AbsenceService} from '../../shared/absence.service';
import {LessonService} from '../../shared/lesson.service';
import {Etudiant} from '../../models/etudiant.model';

@Component({
    selector: 'app-par-crenaux',
    templateUrl: './par-crenaux.component.html',
    styleUrls: ['./par-crenaux.component.css']
})
export class ParCrenauxComponent implements OnInit {
    @Input() promo;
    @Input() group;
    @Input() cours: any[];
    @Input() etuGroupe: Etudiant[];
    public date;
    public loading: boolean;
    public state: string;
    public selectedCours: any[];
    public idLesson: number = null;
    public etuAbs: Etudiant[];

    constructor(private absenceService: AbsenceService, private lessonService: LessonService) {
    }

    pickDate(event: MatDatepickerInputEvent<any>) {
        this.etuAbs = [];
        let datePipe = new DatePipe('en-US');
        this.date = datePipe.transform(event.value, 'yyyy-MM-dd');

        this.selectedCours = this.cours.filter(cour => cour.start.includes(this.date));
        this.selectedCours = this.selectedCours.sort((x: any, y: any) => {
            return (this.getHour(x.start) < this.getHour(y.start) ? -1 : 1);
        });
    }

    public selectEtu(event) {
        if (event.option.selected === true) {
            this.etuAbs.push(event.option.value);
        } else {
            if (this.etuAbs.includes(event.option.value)) {
                this.etuAbs = this.etuAbs.filter(id => id !== event.option.value);
            }
        }
    }

    public selectCrenaux(event) {
        this.idLesson = event;
    }

    protected getHour(dateTime: string) {
        return dateTime.split(' ')[1];
    }

    ngOnInit(): void {

    }

    onSubmit() {
        this.loading = true;
        let request: string = JSON.stringify({
            'lesson_id': this.idLesson,
            'abs': this.etuAbs
        });

        this.absenceService.addAbsenceToLesson(request)
            .subscribe(data => {
                // @ts-ignore
                this.state = data.message;
                this.loading = false;
            });


    }
}
