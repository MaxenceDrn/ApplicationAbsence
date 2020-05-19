import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AbsenceService} from '../../shared/absence.service';

@Component({
  selector: 'app-par-demi-journee',
  templateUrl: './par-demi-journee.component.html',
  styleUrls: ['./par-demi-journee.component.css']
})
export class ParDemiJourneeComponent implements OnInit {
  @Input() cours;
  @Input() idEtudiant;
  public matinee: string;
  public date;
  protected matinStart;
  protected ApresMidiStart;
  public selectedCours: any[];
  public loading;
  public state: string;


  constructor(private absenceService: AbsenceService) { }

  pickDate(event: MatDatepickerInputEvent<any>) {
    let datePipe = new DatePipe('en-US');
    this.date = datePipe.transform(event.value, 'yyyy-MM-dd ');
    this.matinStart = datePipe.transform(event.value, 'yyyy-MM-dd 08:00:00');
    this.ApresMidiStart = datePipe.transform(event.value, 'yyyy-MM-dd 12:45:00');

    //console.log(this.cours[0][0].start);
  }

  pickMatinee(event){
    this.selectedCours = this.cours[0].filter(cour => cour.start.includes(this.date));

    this.matinee = event;
    if(this.matinee === 'Matin'){
      this.selectedCours = this.selectedCours.filter(cour =>
        cour.start < this.ApresMidiStart)
    }else{
      this.selectedCours = this.selectedCours.filter(cour =>
          cour.start >= this.ApresMidiStart)
    }
  }

  test() {
    this.loading = true;
    let absReq = [];
    for (let i = 0, c = this.selectedCours.length; i < c; i++) {
      absReq.push(this.selectedCours[i].id)
    }

    const request = JSON.stringify({
      etudiant_id: this.idEtudiant,
      abs: absReq
    });

    this.absenceService.addAbsenceToEtu(request)
        .subscribe(data => {
          // @ts-ignore
          this.state = data.message;
          this.loading = false;
        });
    }

  ngOnInit(): void {
  }

}
