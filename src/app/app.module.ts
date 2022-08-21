import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FontSizeDirective } from './directives/font-size.directive';
import { StudentPipe } from './pipes/student-pipe.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsTableComponent } from './students/components/students-table/students-table.component';
import { StudentFormComponent } from './students/components/student-form/student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { FooterComponent } from './components/footer/footer.component';
import { StudentsService } from './services/students.service';
import { CoursesService } from './services/courses.service';
import { CoursesComponent } from './components/courses/courses.component';
import { NoPageFoundComponentComponent } from './components/no-page-found-component/no-page-found-component.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FontSizeDirective,
    StudentPipe,
    NavbarComponent,
    ToolbarComponent,
    StudentsTableComponent,
    StudentFormComponent,
    FooterComponent,
    CoursesComponent,
    NoPageFoundComponentComponent,
    PostsComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StudentsService, 
    CoursesService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
