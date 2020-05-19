import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EtudiantService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    public getAgenda(idPersonne: number) {
        const url = `${this.apiUrl}etudiant/${idPersonne}/edt`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getNbAbs(id) {
        const url = `${this.apiUrl}etudiant/${id}/nbAbs`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getNbHAbs(id) {
        const url = `${this.apiUrl}etudiant/${id}/timeAbs`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getAbsModule(id) {
        const url = `${this.apiUrl}etudiant/${id}/abs/module`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getAbsModules(id) {
        const url = `${this.apiUrl}etudiant/${id}/abs/modules`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getEtuById(id) {
        const url = `${this.apiUrl}etudiant/${id}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getEtuByIdPers(id) {
        const url = `${this.apiUrl}etudiant2/${id}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

}
