import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {DirecteurService} from '../../shared/directeur.service';

@Component({
    selector: 'app-home-directeur',
    templateUrl: './home-directeur.component.html',
    styleUrls: ['./home-directeur.component.css'],
})
export class HomeDirecteurComponent implements OnInit {
    public dept = [];
    public selectDept = 'null';
    public promo = [];
    public selectPromo = 'null';
    public name = [];
    public selectName = 'null';
    public tabEtu = [];
    public tabEtuSearch = [];

    public recherche(event) {
        this.tabEtuSearch = [];
        for (const nom of this.tabEtu) {

            if (nom[1].toLowerCase().includes(event.target.value.toLowerCase())) {
                this.tabEtuSearch.push(nom);
            }
        }
    }

    public onChangeDept(event) {
        this.selectDept = event;
        this.selectName = 'null';
        this.selectPromo = 'null';
        this.name = [];
        this.promo = [];
        this.DirecteurService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
    }

    public onChangePromo(event) {
        this.selectPromo = event;
        this.selectName = 'null';
        this.name = [];
        this.DirecteurService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });
        this.DirecteurService.getEtuPromo(this.selectDept, event).subscribe((data) => {
            this.tabEtu = [];
            for (let i = 0; i < data.length; i++) {
                const msg = [data.etu[i].id, data.etu[i].fname + ' ' + data.etu[i].lname];
                this.tabEtu.push(msg);
            }
            this.tabEtuSearch = this.tabEtu;
        });
    }

    public onChangeName(event) {
        this.selectName = event;
        this.DirecteurService.getEtuGroupe(this.selectDept, this.selectPromo, event).subscribe((data) => {
            this.tabEtu = [];
            for (let i = 0; i < data.length; i++) {
                const msg = [data.etu[i].id, data.etu[i].fname + ' ' + data.etu[i].lname];
                console.log(msg);
                this.tabEtu.push(msg);
                console.log(this.tabEtu);
            }
            this.tabEtuSearch = this.tabEtu;
        });

    }

    constructor(private DirecteurService: DirecteurService, private authService: AuthService) {
    }

    public ngOnInit() {
        this.DirecteurService.getDept().subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.dept.push(data[i].dept);
            }
        });
        this.DirecteurService.getPromo(this.selectDept).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.promo.push(data[i].maingroupe);
            }
        });
        this.DirecteurService.getName(this.selectDept, this.selectPromo).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
                this.name.push(data[i].name);
            }
        });

    }
}
