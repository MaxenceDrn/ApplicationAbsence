import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    genders: string[] = ['Mr.', 'Mme.'];
    roles = ['Admin', 'Secretaire', 'Directeur', 'Etudiant'];
    error: any;
    currentUserRole: string;


    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('confirmPassword').value) {
          return {invalid: true};
        }
      }
    
      createForm() {
        this.registerForm = new FormGroup({
          role: new FormControl('', [Validators.required]),
          gender: new FormControl('', [Validators.required]),
          naissance: new FormControl('', [Validators.required]),
          nom: new FormControl('', [Validators.required]),
          prenom: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email]),
          telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')]),
          adresse: new FormControl('', [Validators.required]),
          ville: new FormControl('', [Validators.required]),
          cp: new FormControl('', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9]')]),
          pwd: new FormGroup({
              password: new FormControl(undefined, [Validators.required, Validators.minLength(6)]),
              confirmPassword: new FormControl(undefined, [Validators.required, Validators.minLength(6)])
            }, [this.passwordConfirming]
          ),
        });
      }

      get role() {
        return this.registerForm.get('role');
      }

      get gender() {
        return this.registerForm.get('gender');
      }

      get naissance() {
          return this.registerForm.get('naissance');
      }
    
      get nom() {
        return this.registerForm.get('nom');
      }
    
      get prenom() {
        return this.registerForm.get('prenom');
      }
    
      get email() {
        return this.registerForm.get('email');
      }

      get telephone() {
        return this.registerForm.get('telephone');
      }

      get adresse() {
        return this.registerForm.get('adresse');
      }

      get ville() {
        return this.registerForm.get('ville');
      }

      get cp() {
        return this.registerForm.get('cp');
      }
    
      get password() {
        return this.registerForm.get('pwd.password');
      }
    
      get confirmPassword() {
        return this.registerForm.get('pwd.confirmPassword');
      }



    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        /*if (this.authService.currentUserValue.user.role === 'Secretaire') {
            this.createFormEtudiant();
        }*/
        this.createForm();
        this.currentUserRole = this.authService.currentUserValue.role;
    }

    formatDate(date: any){
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'yyyy-MM-dd');
    }

    onSubmit() {
        // console.log(this.registerForm.value);
        const request = JSON.stringify({
            gender: this.gender.value,
            nom: this.nom.value,
            prenom: this.prenom.value,
            email: this.email.value,
            password: this.password.value,
            dateNaissance: this.formatDate(this.naissance.value),
            adresse: this.adresse.value,
            cp: this.cp.value,
            ville: this.ville.value,
            telephone: this.telephone.value,
            role: this.role.value,
        });
        this.authService.onRegister(request)
            .subscribe(
                () => this.router.navigate(['/']),
                (error) => {
                    console.log("Erreur en retour", error);
                    this.error = error;
                }
            )
    }
}
