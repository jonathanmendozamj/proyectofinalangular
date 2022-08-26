import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogDataInscription } from '../inscriptions-table/inscriptions-table.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscriptionDetailComponent } from '../inscription-detail/inscription-detail.component';
import { StudentsService } from 'src/app/students/services/students.service';
import { CoursesService } from 'src/app/courses/services/courses.service';

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
      name: [this.dialogData.inscription?.name, [Validators.required]],
      surname: [this.dialogData.inscription?.surname, [Validators.required]],
      dni: [this.dialogData.inscription?.dni, [Validators.required]],
      commission: [this.dialogData.inscription?.commission, [Validators.required]],
      nameCourse: [this.dialogData.inscription?.nameCourse, [Validators.required]]
    });

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data as any[];
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data as any[];
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completado.');
      }
    });

    this.formInscription.get('dni')?.valueChanges.subscribe(dni => {
      let studentData = this.students.find(student => student.dni === dni);
      console.log('Entro aca a valueChanges dni');

      this.formInscription.patchValue({
        name: studentData.name,
        surname: studentData.surname
      });
    });

    this.formInscription.get('commission')?.valueChanges.subscribe(commission => {
      let courseData = this.courses.find(course => course.commission === commission);

      console.log('Entro aca a valueChanges commission');
      console.log(courseData);

      this.formInscription.patchValue({
        nameCourse: courseData.nameCourse
      });

      console.log(this.formInscription.value);
    });
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close(this.formInscription.value);
  }

}
