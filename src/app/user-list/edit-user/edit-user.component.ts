import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonneService} from '../../shared/personne.service';
import {Personne} from '../../models/personne.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  readonly id = +this.route.snapshot.paramMap.get('id');
  public loading: boolean;
  public currentPersonne: Personne;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private personneSerive: PersonneService,
              private authService: AuthService,
              private router: Router) { }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  get role() {
    return this.editForm.get('role');
  }

  get naissance() {
    return this.editForm.get('naissance');
  }

  get nom() {
    return this.editForm.get('nom');
  }

  get prenom() {
    return this.editForm.get('prenom');
  }

  get email() {
    return this.editForm.get('email');
  }

  get telephone() {
    return this.editForm.get('telephone');
  }

  get adresse() {
    return this.editForm.get('adresse');
  }

  get ville() {
    return this.editForm.get('ville');
  }

  get cp() {
    return this.editForm.get('cp');
  }

  get password() {
    return this.editForm.get('pwd.password');
  }

  get confirmPassword() {
    return this.editForm.get('pwd.confirmPassword');
  }

  fillForm() {
    this.editForm.patchValue({
      nom: this.currentPersonne.nom,
      prenom: this.currentPersonne.prenom,
      naissance: this.currentPersonne.dateNaissance,
      adresse: this.currentPersonne.adresse,
      ville: this.currentPersonne.ville,
      cp: this.currentPersonne.cp,
      email: this.currentPersonne.email,
      telephone: this.currentPersonne.telephone,
      role: this.currentPersonne.role,
    });
  }

  createEditForm() {
    this.editForm = new FormGroup({
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

  onSubmit() {
    const request = JSON.stringify({
      nom: this.nom.value,
      prenom: this.prenom.value,
      email: this.email.value,
      password: this.password.value,
      dateNaissance: this.naissance.value,
      adresse: this.adresse.value,
      cp: this.cp.value,
      ville: this.ville.value,
      telephone: this.telephone.value,
      role: this.role.value,
    });

    this.personneSerive.updatePersonne(this.currentPersonne.id, request)
        .subscribe(
            rep => {
              console.log('userValue',this.authService.currentUserValue)
              if(this.authService.currentUserValue.id === this.currentPersonne.id){
                this.currentPersonne = Personne.parse(rep.personne[0]);
                this.authService.updateLocalStorage(this.currentPersonne);
              }else{
                this.currentPersonne = Personne.parse(rep.personne[0]);
              }
              this.router.navigate(['/listUser'])
            }
        )

  }

  ngOnInit(): void {
    this.loading = true;
    this.personneSerive.getPersonne(this.id)
        .subscribe(
            data => {
              this.currentPersonne = Personne.parse(data);
              this.createEditForm();
              this.fillForm();
              this.loading = false;
              console.log('Personne sélectionnée', this.currentPersonne);
            }
        )
  }

}
