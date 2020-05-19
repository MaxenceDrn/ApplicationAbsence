import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Personne} from '../models/personne.model';
import {map, tap} from 'rxjs/operators';

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
export class PersonneService {
    private readonly apiUrl = environment.apiUrl;
    private personneUrl = this.apiUrl + 'personnes';

    constructor(private http: HttpClient) {
    }

    getPersonnes(): Observable<Personne[]> {
        return this.http.get<Observable<any>>(this.personneUrl)
            .pipe(
                tap((rep: any) => console.log(),
                map(rep => {
                    // @ts-ignore
                    return rep.map(x => Personne.parse(x));
                })
            ));
    }

    getPersonne(id: number): Observable<Personne[]> {
        const url = `${this.apiUrl}personne/${id}`;
        return this.http.get<Observable<{}>>(url)
            .pipe(
                tap((rep: any) => console.log(),
                map(rep => {
                    return rep;
                })
            ));
    }

    updatePersonne(id: number, request: string){
        const url = `${this.apiUrl}personne/${id}/update`;
        return this.http.post(url, request, httpOptions)
            .pipe(
                tap(data => {
                    console.log();
                }),
                map((data: any) => {
                    return data;
                }));
    }

    deleteUser(idUser: number){
        const url = `${this.apiUrl}user/delete/${idUser}`
        return this.http.delete(url)
            .pipe(
                tap(data => {
                    console.log(data);
                }))
    }

}
