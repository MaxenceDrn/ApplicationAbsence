import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AngularMaterialModule} from '../angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthRoutingModule} from './auth-routing.module';
import {MatTabsModule, MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';

export const MY_FORMAT: MatDateFormats = {
  parse: {
  dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        FlexLayoutModule,
        MatTabsModule
    ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }
  ],
})
export class AuthModule { }
