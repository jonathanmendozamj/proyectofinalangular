import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataCourse } from 'src/app/core/interfaces/dialog-data-course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  formCourse!: FormGroup; 

  constructor(private fb: FormBuilder, 
    private dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataCourse) {

    }

  ngOnInit(): void {
    this.formCourse = this.fb.group({
      id: [this.dialogData.course?.id],
      nameCourse: [this.dialogData.course?.nameCourse, [Validators.required, Validators.maxLength(80)]],
      commission: [this.dialogData.course?.commission, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(4), Validators.maxLength(8)]],
    });
  }

  update() {
    this.dialogRef.close(this.formCourse.value);
  }

  close() {
    this.dialogRef.close();
  }

}
