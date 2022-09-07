import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogDataInscription } from '../inscriptions-table/inscriptions-table.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { StudentsService } from 'src/app/students/services/students.service';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Student } from 'src/app/core/models/student.model';
import { Course } from 'src/app/core/models/course.model';

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
    private studentService: StudentsService,
    private courseService: CoursesService) { 

  }

  ngOnInit(): void {
    this.formInscription = this.fb.group({
      id: [this.dialogData.inscription?.id],
      idCourse: [this.dialogData.inscription?.idCourse, [Validators.required]],
      idStudent: [this.dialogData.inscription?.idStudent, [Validators.required]]
    });

    this.courseService.getAllCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.studentService.getAllStudents()
      .subscribe({
        next: (data: Student[]) => {
          this.students = data;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Completado.');
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
