import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialLayoutsModule } from 'app/material-bundles/material-layouts.module';
import { AppSharedModule } from 'app/shared/app-shared.module';
import { Dert2024IntroBannerComponent } from './components/dert2024-intro-banner/dert2024-intro-banner.component';
import { DodIntroBannerComponent } from './components/dod-intro-banner/dod-intro-banner.component';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';

@NgModule({
  imports: [
    AppSharedModule,
    MaterialLayoutsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent,
    DodIntroBannerComponent,
    Dert2024IntroBannerComponent
  ]
})
export class HomeModule { }
