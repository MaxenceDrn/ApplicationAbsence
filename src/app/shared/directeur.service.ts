import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DirecteurService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    public getDept() {
        const url = `${this.apiUrl}secretaire`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getPromo(dept: string) {
        const url = `${this.apiUrl}secretaire/${dept}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getName(dept: string, maingroupe: string) {
        const url = `${this.apiUrl}secretaire/${dept}/${maingroupe}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getEtuPromo(dept: string, maingroupe: string) {
        const url = `${this.apiUrl}directeur/${dept}/${maingroupe}`;
        return this.http.get<Observable<any>>(url)
            .pipe(

                tap((rep: any) => console.log()),
            );
    }

    public getEtuGroupe(dept: string, maingroupe: string, name: string) {
        const url = `${this.apiUrl}directeur/${dept}/${maingroupe}/${name}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }
}
