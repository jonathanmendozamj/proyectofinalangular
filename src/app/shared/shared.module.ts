import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FontSizeDirective } from './directives/font-size.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentPipe } from './pipes/student-pipe.pipe';

@NgModule({
  declarations: [
    FontSizeDirective,
    StudentPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontSizeDirective,
    StudentPipe
  ]
})
export class SharedModule { }
