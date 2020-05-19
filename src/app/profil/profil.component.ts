import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonneService } from '../shared/personne.service';
import { Personne } from '../models/personne.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  readonly id = +this.route.snapshot.paramMap.get('id');
  personne: Personne;
  loading = false;

  constructor(private route: ActivatedRoute, private personneSerive: PersonneService) { }

  ngOnInit(): void {
    this.loading = true;
    this.personneSerive.getPersonne(this.id)
      .subscribe(rep => {
            this.personne = Personne.parse(rep);
            this.loading = false;
          }
        )
  }

}
