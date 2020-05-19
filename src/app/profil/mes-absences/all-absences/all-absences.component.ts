import {Component, Input, OnInit} from '@angular/core';
import {EtudiantService} from '../../../shared/etudiant.service';
import {Etudiant} from '../../../models/etudiant.model';

@Component({
  selector: 'app-all-absences',
  templateUrl: './all-absences.component.html',
  styleUrls: ['./all-absences.component.css']
})
export class AllAbsencesComponent implements OnInit {
  @Input() etudiant: Etudiant;
  public loading: boolean;
  public tab;

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loading = true;
    // console.log(this.etudiant);
    this.etudiantService.getAbsModule(this.etudiant.id)
        .subscribe(
            data => {
              this.tab = data;
              // console.log(this.tab);
              this.loading = false;

            }
        )
  }

}
