import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})
export class AbsenceService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }


    addAbsenceToEtu(request: string) {
        const url = `${this.apiUrl}addAbsenceToEtu`;
        return this.http.post(url, request, httpOptions)
            .pipe(
                tap(data => console.log('Le retour serveur', data)
                )
            );
    }

    addAbsenceToLesson(request: string) {
        const url = `${this.apiUrl}addAbsenceToLesson`;
        return this.http.post(url, request, httpOptions)
            .pipe(
                tap(data => console.log('Le retour serveur', data)
                )
            );
    }

    getTotalTimeModule(idModule: number){
        const url = `${this.apiUrl}getTotalTime/${idModule}`;
        return this.http.get(url)
            .pipe()
    }

    public deleteAbs(idEtu: string, idLesson: string) {
        const url = `${this.apiUrl}abs/delete/${idEtu}/${idLesson}`;
        return this.http.delete(url).pipe(
            tap(),
        );
    }

    public getInfoAbs(idEtu, idLes) {
        const url = `${this.apiUrl}abs/edit/${idEtu}/${idLes}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public getAllAbs(idEtu: number) {
        const url = `${this.apiUrl}abs/getAll/${idEtu}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }

    public addJusti(request) {
        const url = `${this.apiUrl}addJusti`;
        return this.http.post(url, request)
            .pipe(
                tap((data) => console.log('Le retour serveur', data)
                )
            );
    }

    public editAbs(request) {
        const url = `${this.apiUrl}editAbs`;
        return this.http.post(url, request, httpOptions)
            .pipe(
                tap((data) => console.log('Le retour serveur', data)
                )
            );
    }

    public editMultiAbs(request) {
        const url = `${this.apiUrl}editMultiAbs`;
        return this.http.post(url, request)
            .pipe(
                tap((data) => console.log('Le retour serveur', data)
                )
            );
    }

    public getAbsence(idEtu,idLes) {
        const url = `${this.apiUrl}getAbs/${idEtu}/${idLes}`;
        return this.http.get<Observable<any>>(url)
            .pipe(
                tap((rep: any) => console.log()),
            );
    }
}
