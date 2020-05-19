import {Component, OnInit} from '@angular/core';
import {Personne} from '../models/personne.model';
import {PersonneService} from '../shared/personne.service';
import {AuthService} from '../shared/auth.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    public loading: boolean;
    public tabPers: Personne[] = [];
    public currentUser: Personne;

    constructor(private personneService: PersonneService, private authService: AuthService) {
    }

    public deleteUser(userId: number){
        this.personneService.deleteUser(userId)
            .subscribe(
                data => {
                    console.log(data);
                    this.reload();
                }
            )
    }

    public reload(){
        this.tabPers = [];
        this.loading = true;
        this.personneService.getPersonnes()
            .subscribe(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        this.tabPers.push(Personne.parse(data[i]));
                    }
                    this.loading = false;
                }
            );
    }

    ngOnInit(): void {
        this.loading = true;
        this.personneService.getPersonnes()
            .subscribe(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        this.tabPers.push(Personne.parse(data[i]));
                    }
                    console.log(this.tabPers);
                    this.currentUser = this.authService.currentUserValue;
                    this.loading = false;
                }
            );

    }
}
