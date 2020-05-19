import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbsenceService} from '../../../../shared/absence.service';

@Component({
    selector: 'app-edit-abs',
    templateUrl: './edit-abs.component.html',
    styleUrls: ['./edit-abs.component.css'],
})
export class EditAbsComponent implements OnInit {


    public etats = ['Validee', 'NonValidee', 'Etude'];
    public reason = '';
    public etat = '';
    public idEtu = this.route.snapshot.paramMap.get('idEtu');
    public idLes = this.route.snapshot.paramMap.get('idLes');
    public loading = false;
    public datas;
    public title = 'dropzone';
    public files: File[] = [];

    constructor(private AbsenceService: AbsenceService, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }


    public initData(idEtu, idLes) {
        this.AbsenceService.getInfoAbs(idEtu, idLes).subscribe((data) => {
            this.datas = data[0];
            this.loading = false;
        });
    }

    public ngOnInit(): void {
        this.initData(this.idEtu, this.idLes);
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
            this.etat = this.datas.etat;
        }
        const request = JSON.stringify({
            idEtu: this.idEtu,
            idLes: this.idLes,
            reason: this.reason,
            etat: this.etat,
        });
        this.AbsenceService.editAbs(request)
            .subscribe((res) => {
                // @ts-ignore
                const data: FormData = new FormData();
                data.append('idEtu', this.idEtu);
                data.append('idLes', this.idLes);
                data.append('_method', 'PUT');
                data.append('file', this.files[0], this.files[0].name);
                this.AbsenceService.addJusti(data)
                    .subscribe((res) => {
                        console.log(res);
                        this.router.navigate(['homeDir', this.idEtu]);
                    });
            });

    }
}
