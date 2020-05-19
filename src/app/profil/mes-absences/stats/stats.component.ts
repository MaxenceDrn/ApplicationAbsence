import {Component, Input, OnInit} from '@angular/core';
import {Etudiant} from '../../../models/etudiant.model';
import {EtudiantService} from '../../../shared/etudiant.service';
import {AbsenceService} from '../../../shared/absence.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    @Input() etudiant: Etudiant;
    public loading: boolean;
    public tab: any[];

    totalTime: string;

    constructor(private etudiantService: EtudiantService, private absenceService: AbsenceService) {
    }

    public getTotal(idModule: number) {
        this.absenceService.getTotalTimeModule(idModule)
            .subscribe(data => {
                // console.log(data.time);
                // @ts-ignore
                return data.time;
            });
    }

    public countTotal() {
        let totalHour: number = 0;
        let totalMinute: number = 0;
        for (let i = 0; i < this.tab.length; i++) {
            let tmp = this.tab[i][2].replace('m', '').replace('h', '').split(':');
            totalHour += +tmp[0];
            totalMinute += +tmp[1];
        }
        if (totalMinute >= 60) {
            totalHour += Math.floor(totalMinute / 60);
            totalMinute = totalMinute % 60;
        }
        this.totalTime = totalHour + 'h:' + totalMinute + 'm';
    }

    public getTimeEtu(moduleId: number) {
        let m = 0, h = 0;
        this.tab.forEach(module => {
            if (module[0] === moduleId) {
                module[3].forEach(abs => {
                    if (abs[5] === 'Etude') {
                        const tmp = abs[0].replace('m', '').replace('h', '').split(':');
                        h += +tmp[0];
                        m += +tmp[1];
                    }
                });
            }
        });
        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }
        return h + 'h:' + m + 'm';
    }

    public getTimeInvalid(moduleId: number) {
        let m = 0, h = 0;
        this.tab.forEach(module => {
            if (module[0] === moduleId) {
                module[3].forEach(abs => {
                    if (abs[5] === 'NonValidee') {
                        const tmp = abs[0].replace('m', '').replace('h', '').split(':');
                        h += +tmp[0];
                        m += +tmp[1];
                    }
                });
            }
        });
        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }
        return h + 'h:' + m + 'm';
    }

    public getTimeValid(moduleId: number) {
        let m = 0, h = 0;
        this.tab.forEach(module => {
            if (module[0] === moduleId) {
                module[3].forEach(abs => {
                    if (abs[5] === 'Validee') {
                        const tmp = abs[0].replace('m', '').replace('h', '').split(':');
                        h += +tmp[0];
                        m += +tmp[1];
                    }
                });
            }
        });
        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }
        return h + 'h:' + m + 'm';
    }

    public calcPercentageInvalid(moduleId: number, timeModule: string): number{
        const timeInvalid = this.getTimeInvalid(moduleId);
        let invalid = timeInvalid.replace('m', '').replace('h', '').split(':');
        let total = timeModule.replace('m', '').replace('h', '').split(':');
        let invalidMinute = +invalid[0]*60 + +invalid[1];
        let totalModuleMinute = +total[0]*60 + +total[1]

        return invalidMinute/totalModuleMinute * 100;

    }

    ngOnInit(): void {
        this.loading = true;
        console.log(this.etudiant);
        this.etudiantService.getAbsModules(this.etudiant.id)
            .subscribe(
                data => {
                    this.tab = data;
                    this.countTotal();
                    for (let i = 0; i < this.tab.length; i++) {
                        this.absenceService.getTotalTimeModule(this.tab[i][0])
                            .subscribe(
                                data => {
                                    // @ts-ignore
                                    this.tab[i].push(data.time);
                                    this.tab[i].push(this.calcPercentageInvalid(this.tab[i][0], this.tab[i][4]))
                                }
                            )
                    }
                    console.log(this.tab);
                    this.loading = false;
                }
            );

    }

}
