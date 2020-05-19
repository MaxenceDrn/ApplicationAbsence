import {Component, Input, OnInit} from '@angular/core';
import {Personne} from '../../models/personne.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonneService} from '../../shared/personne.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-mes-informations',
  templateUrl: './mes-informations.component.html',
  styleUrls: ['./mes-informations.component.css']
})
export class MesInformationsComponent implements OnInit {
  @Input() personne: Personne;
  visu: boolean = true;
  editPwd: boolean = false;
  editForm: FormGroup;
  editPwdForm: FormGroup;
  state: string;

  constructor(private personneService: PersonneService, private authService: AuthService) { }

  ngOnInit(): void {
    this.createEditForm();
    this.createPwdForm();
    this.fillForm();
    this.editForm.controls['nom'].disable();
    this.editForm.controls['prenom'].disable();
    this.editForm.controls['naissance'].disable();
    this.editForm.controls['email'].disable();


  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
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

  createPwdForm(){
    this.editPwdForm = new FormGroup({
      old: new FormControl('', [Validators.required]),
      pwd: new FormControl(undefined, [Validators.required, Validators.minLength(6)]),
      pwdC: new FormControl(undefined, [Validators.required, Validators.minLength(6)])
    });
  }

  fillForm() {
    this.editForm.patchValue({
      nom: this.personne.nom,
      prenom: this.personne.prenom,
      naissance: this.personne.dateNaissance,
      adresse: this.personne.adresse,
      ville: this.personne.ville,
      cp: this.personne.cp,
      email: this.personne.email,
      telephone: this.personne.telephone,
      role: this.personne.role,
    });
  }

  //edit Password Form
  get old() {
    return this.editPwdForm.get('old');
  }

  get pwd() {
    return this.editPwdForm.get("pwd");
  }

  get pwdC() {
    return this.editPwdForm.get("pwdC");
  }

  onSubmitPwd() {
    const request = JSON.stringify({
      id: this.personne.id,
      old: this.old.value,
      pwd: this.pwd.value,
      pwdC: this.pwdC.value,
    });

    this.authService.updatePassword(request)
        .subscribe(rep => {
          console.log(rep);
          // @ts-ignore
          this.state = rep.message;
        })
  }
  //end

  // edit Profil Form
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

    this.personneService.updatePersonne(this.personne.id, request)
        .subscribe(
            rep => {
                this.personne = Personne.parse(rep.personne[0]);
                this.authService.updateLocalStorage(this.personne);
            }
        )
    
    this.visu = !this.visu;
  }
  //end


}
