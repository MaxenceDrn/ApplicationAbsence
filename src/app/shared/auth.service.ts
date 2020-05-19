import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Personne} from '../models/personne.model';
import {map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

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
export class AuthService {
    private readonly apiUrl = environment.apiUrl;
    private registerUrl = this.apiUrl + 'register';
    private loginUrl = this.apiUrl + 'login';
    private currentUserSubject: BehaviorSubject<Personne>;
    public currentUser: Observable<Personne>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<Personne>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Personne {
        return this.currentUserSubject.value;
    }

    onLogin(user: { email: string, password: string }): Observable<{} | Personne> {
        const request = JSON.stringify({
            email: user.email,
            password: user.password
        });
        return this.http.post(this.loginUrl, request, httpOptions)
            .pipe(
                tap(data => {
                    return data;
                }),
                map((data: any) => {
                    console.log('repLogin', data);
                    this.createPerson(data);
                    return data;
                }));
    }

    createPerson(data: any) {
        if(data.message === 'Success'){
            let personne = Personne.parse(data.personne);
            this.storeToken(data, personne);
        }
    }

    public updateLocalStorage(personne: Personne) {
        let oldStorage: string = localStorage.getItem('currentUser');
        const tab = oldStorage.split('token');
        let tmp = tab[1].split("\"");
        const token = tmp[2];
        personne.user.token = token;
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(personne));
        this.currentUserSubject.next(personne);
    }

    storeToken(data: any, personne: Personne) {
        personne.user.token = data.accessToken;
        localStorage.setItem('currentUser', JSON.stringify(personne));
        console.log('Personne (storage) : ', personne);
        this.currentUserSubject.next(personne);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    updatePassword(request: string) {
        const url = `${this.apiUrl}user/updatePassword`;
        return this.http.post(url, request, httpOptions)
            .pipe(
                tap(data => {
                    return data;
                })
            )
    }

    onRegister(request: string) {

        return this.http.post(this.registerUrl, request, httpOptions)
            .pipe(
                tap(data => {
                    console.log('');
                }),
                map((data: any) => {
                    console.log('le retour du register', data);
                    return data.message;
                }));
    }


}
