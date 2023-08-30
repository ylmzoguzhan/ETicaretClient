import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HomeLayoutComponent } from './home-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    HomeLayoutComponent
  ]
})
export class HomeLayoutModule { }
