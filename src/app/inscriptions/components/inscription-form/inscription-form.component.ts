import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { StudentsService } from 'src/app/students/services/students.service';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Student } from 'src/app/core/models/student.model';
import { Course } from 'src/app/core/models/course.model';
import { DialogDataInscription } from 'src/app/core/interfaces/dialog-data-inscription';
import { AppState } from 'src/app/core/states/app.state';
import { Store } from '@ngrx/store';
import { sessionSelector } from 'src/app/core/states/selectors/user.selector';
import { Session } from 'src/app/core/models/session.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  formInscription!: FormGroup; 
  courses: any[] = [];
  students: any[] = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataInscription,
    private sessionStore: Store<AppState>,
    private studentService: StudentsService,
    private courseService: CoursesService) { 

  }

  ngOnInit(): void {
    let idCurrentUser: string = '';
    let name: string = '';
    this.sessionStore.select(sessionSelector)
      .subscribe(data => {
        idCurrentUser = (data.user?.id || '');
        name = (data.user?.name || '');
      });

    this.formInscription = this.fb.group({
      id: [this.dialogData.inscription?.id],
      idCourse: [this.dialogData.inscription?.idCourse, [Validators.required]],
      idStudent: [this.dialogData.inscription?.idStudent, [Validators.required]],
      idUser: [idCurrentUser, [Validators.required]]
    });

    console.log(idCurrentUser);

    this.courseService.getAllCourses()
      .subscribe({
        next: (data: Course[]) => {
          this.courses = data;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.studentService.getAllStudents()
      .subscribe({
        next: (data: Student[]) => {
          this.students = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close(this.formInscription.value);
  }

}
