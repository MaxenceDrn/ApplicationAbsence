import {Component, OnInit} from '@angular/core';
import TimeGridPlugin from '@fullcalendar/timegrid';
import {AuthService} from '../../shared/auth.service';
import DayGrid from '@fullcalendar/daygrid';
import {SecretaireService} from '../../shared/secretaire.service';

@Component({
    selector: 'app-home-secretaire',
    templateUrl: './home-secretaire.component.html',
    styleUrls: ['./home-secretaire.component.css'],
})
export class HomeSecretaireComponent implements OnInit {

    public calendarVisible = false;
    public cours: any = [];
    public loading = false;

    public dept = [];
    public selectDept = 'null';
    public promo = [];
    public selectPromo = 'null';
    public name = [];
    public selectName = 'null';

    public calendarPlugins = [TimeGridPlugin, DayGrid];

    public setVisible() {
        this.calendarVisible = !this.calendarVisible;
        console.log(this.calendarVisible);
    }

    public onChangeDept(event) {
        this.selectDept = event; this.selectName = 'null'; this.selectPromo = 'null'; this.name = [];
        this.promo = [];
        this.calendarService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
    }

    public onChangePromo(event) {
        this.selectPromo = event; this.selectName = 'null';
        this.name = [];
        this.calendarService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });
    }

    public onChangeName(event) {
        this.cours = [];
        this.selectName = event;
        this.loading = true;
        if (this.authService.currentUserValue.role === 'Secretaire') {
            this.calendarService.getAgenda(this.selectDept, this.selectPromo, this.selectName)
                .subscribe(
                    (data) => {
                        console.log(data);
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

    constructor(private calendarService: SecretaireService, private authService: AuthService) {
    }

    public ngOnInit() {
        this.calendarService.getDept().subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.dept.push(data[i].dept);
            }
        });
        this.calendarService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
        this.calendarService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });

    }
}
