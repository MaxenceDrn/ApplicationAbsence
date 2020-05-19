import {Component, OnInit} from '@angular/core';
import TimeGridPlugin from '@fullcalendar/timegrid';
import {AuthService} from '../../shared/auth.service';
import {EtudiantService} from '../../shared/etudiant.service';
import DayGrid from '@fullcalendar/daygrid';

@Component({
    selector: 'app-home-etudiant',
    templateUrl: './home-etudiant.component.html',
    styleUrls: ['./home-etudiant.component.css'],
})
export class HomeEtudiantComponent implements OnInit {
    public calendarVisible = false;
    public cours: any = [];
    loading = false;


    public calendarPlugins = [TimeGridPlugin, DayGrid];

    public setVisible() {
        this.calendarVisible = !this.calendarVisible;
        console.log(this.calendarVisible);
    }

    constructor(private calendarService: EtudiantService, private authService: AuthService) {
    }

    public ngOnInit() {
        this.loading = true;
        if (this.authService.currentUserValue.role === 'Etudiant') {
            this.calendarService.getAgenda(this.authService.currentUserValue.id)
                .subscribe(
                    (data) => {
                        for (let i = 0; i < data.cours.length; i++) {
                            this.cours.push(
                                {
                                    title: data.cours[i].module,
                                    start: data.cours[i].start,
                                    end: data.cours[i].end,
                                },
                            );
                        }
                        console.log('cours', this.cours);
                        this.loading = false;

                    },
                );
        }
    }
}
