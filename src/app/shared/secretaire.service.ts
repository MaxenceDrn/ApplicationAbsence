import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SecretaireService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    public getDept() {
        const url = `${this.apiUrl}secretaire`;
        console.log(url);
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getPromo(dept: string) {
        const url = `${this.apiUrl}secretaire/${dept}`;
        console.log(url);
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getName(dept: string, maingroupe: string) {
        const url = `${this.apiUrl}secretaire/${dept}/${maingroupe}`;
        console.log(url);
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getAgenda(dept: string, promo: string, nomGroupe: string){
        const url = `${this.apiUrl}secretaire/${dept}/${promo}/${nomGroupe}/edt`;
        console.log(nomGroupe);
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log())
            )
    }


}
