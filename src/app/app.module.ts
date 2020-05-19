import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeDirecteurComponent} from './home/home-directeur/home-directeur.component';
import {EditAbsComponent} from './home/home-directeur/info-etu/edit-abs/edit-abs.component';
import {InfoEtuComponent} from './home/home-directeur/info-etu/info-etu.component';
import {HomeSecretaireComponent} from './home/home-secretaire/home-secretaire.component';
import {HomeComponent} from './home/home.component';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './shared/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './layout/nav/nav.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

import {
    MatMenuModule,
    MatDateFormats,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonToggleModule
} from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeEtudiantComponent } from './home/home-etudiant/home-etudiant.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfilComponent } from './profil/profil.component';
import { MesAbsencesComponent } from './profil/mes-absences/mes-absences.component';
import { MesInformationsComponent } from './profil/mes-informations/mes-informations.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AbsenceComponent } from './absence/absence.component';
import {registerLocaleData} from '@angular/common';
import { ParDemiJourneeComponent } from './absence/par-demi-journee/par-demi-journee.component';
import { ParJourComponent } from './absence/par-jour/par-jour.component';
import { PersonnaliseComponent } from './absence/personnalise/personnalise.component';
import {ParCrenauxComponent} from './absence/par-crenaux/par-crenaux.component';
import {ParEtudiantCrenauxComponent} from './absence/par-etudiant-crenaux/par-etudiant-crenaux.component';
import { AllAbsencesComponent } from './profil/mes-absences/all-absences/all-absences.component';
import { StatsComponent } from './profil/mes-absences/stats/stats.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './user-list/edit-user/edit-user.component';
import { EditMultiAbsComponent } from './home/home-directeur/info-etu/edit-multi-abs/edit-multi-abs.component';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        PageNotFoundComponent,
        HomeEtudiantComponent,
        HomeSecretaireComponent,
        ProfilComponent,
        MesAbsencesComponent,
        MesInformationsComponent,
        AbsenceComponent,
        HomeSecretaireComponent,
        HomeDirecteurComponent,
        ParEtudiantCrenauxComponent,
        ParDemiJourneeComponent,
        ParJourComponent,
        PersonnaliseComponent,
        InfoEtuComponent,
        ParCrenauxComponent,
        EditAbsComponent,
        AllAbsencesComponent,
        StatsComponent,
        UserListComponent,
        EditUserComponent,
        EditMultiAbsComponent

    ],
    imports: [
        NgxDropzoneModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        AuthModule,
        HttpClientModule,
        MatMenuModule,
        FullCalendarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        FormsModule,

    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

