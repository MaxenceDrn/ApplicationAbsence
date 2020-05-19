import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeDirecteurComponent} from './home/home-directeur/home-directeur.component';
import {EditAbsComponent} from './home/home-directeur/info-etu/edit-abs/edit-abs.component';
import {InfoEtuComponent} from './home/home-directeur/info-etu/info-etu.component';
import {HomeEtudiantComponent} from './home/home-etudiant/home-etudiant.component';
import {HomeSecretaireComponent} from './home/home-secretaire/home-secretaire.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminGuardService} from './shared/admin-guard.service';
import {AuthGuardService} from './shared/auth-guard.service';
import {EtudiantGuardService} from './shared/etudiant-guard.service';
import { ProfilComponent } from './profil/profil.component';
import {AbsenceComponent} from './absence/absence.component';
import {SecretaireGuardService} from './shared/secretaire-guard.service';
import {DirecteurGuardService} from './shared/directeur-guard.service';
import {MesAbsencesComponent} from './profil/mes-absences/mes-absences.component';
import {UserListComponent} from './user-list/user-list.component';
import {EditUserComponent} from './user-list/edit-user/edit-user.component';
import {EditMultiAbsComponent} from './home/home-directeur/info-etu/edit-multi-abs/edit-multi-abs.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, canActivate: [AdminGuardService]},
    {path: 'homeEtu', component: HomeEtudiantComponent, canActivate: [EtudiantGuardService]},
    {path: 'homeSec', component: HomeSecretaireComponent, canActivate: [SecretaireGuardService]},
    {path: 'homeDir', component: HomeDirecteurComponent, canActivate: [DirecteurGuardService]},
    {path: 'homeDir/:id', component: InfoEtuComponent, canActivate: [DirecteurGuardService]},
    {path: 'homeDir/editAbs/:idEtu/:idLes', component: EditAbsComponent, canActivate: [DirecteurGuardService]},
    {path: 'homeDir/editMultiAbs/:idEtu', component: EditMultiAbsComponent, canActivate: [DirecteurGuardService]},
    {path: 'absences', component: AbsenceComponent, canActivate: [SecretaireGuardService]},
    {path: 'profil/:id', component: ProfilComponent},
    {path: 'mesAbsences', component: MesAbsencesComponent, canActivate: [EtudiantGuardService]},
    {path: 'listUser', component: UserListComponent, canActivate: [AdminGuardService]},
    {path: 'editUser/:id', component: EditUserComponent, canActivate: [AdminGuardService]},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
