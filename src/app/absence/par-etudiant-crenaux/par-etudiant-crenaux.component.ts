import {Component, Input, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material';
import {DatePipe} from '@angular/common';
import {AbsenceService} from '../../shared/absence.service';

@Component({
  selector: 'app-par-etudiant-crenaux',
  templateUrl: './par-etudiant-crenaux.component.html',
  styleUrls: ['./par-etudiant-crenaux.component.css']
})
export class ParEtudiantCrenauxComponent implements OnInit {
  date: any;
  @Input() cours;
  @Input() idEtudiant;
  selectedCours: any[];
  selectedCrenaux: boolean = false;
  state: string;
  loading: boolean = false;

  abs: number[] = [];

  constructor(private absenceService: AbsenceService) { }



  pickDate(event: MatDatepickerInputEvent<any>) {
    let datePipe = new DatePipe('en-US');
    this.date = datePipe.transform(event.value, 'yyyy-MM-dd');

    this.selectedCours = this.cours[0].filter(cour => cour.start.includes(this.date));


    this.selectedCours = this.selectedCours.sort((x: any, y: any) => {
      return (this.getHour(x.start) < this.getHour(y.start) ? -1 : 1);
    })
  }

  protected getHour(dateTime: string) {
    return dateTime.split(' ')[1];
  }

  selectCrenaux(event) {
    this.selectedCrenaux = true;
    if (event.option.selected === true) {
      this.abs.push(event.option.value);
    } else {
      if (this.abs.includes(event.option.value)) {
        this.abs = this.abs.filter(id => id !== event.option.value);
      }
    }
  }

  onSubmit() {
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
