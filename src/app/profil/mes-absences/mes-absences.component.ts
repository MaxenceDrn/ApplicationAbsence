import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Personne} from '../../models/personne.model';
import {EtudiantService} from '../../shared/etudiant.service';
import {Etudiant} from '../../models/etudiant.model';

@Component({
  selector: 'app-mes-absences',
  templateUrl: './mes-absences.component.html',
  styleUrls: ['./mes-absences.component.css']
})
export class MesAbsencesComponent implements OnInit {
  public currentUser: Personne;
  public currentEtudiant: Etudiant;
  public loadingEtu: boolean;

  constructor(private authService: AuthService, private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loadingEtu = true;
    this.currentUser = this.authService.currentUserValue;
    // console.log('user', this.currentUser);
    this.etudiantService.getEtuByIdPers(this.currentUser.id)
        .subscribe(
            (data) => {
              this.currentEtudiant = data[0];
              this.loadingEtu = false;
              // console.log('etu', this.currentEtudiant);
            }
        );
  }

}
