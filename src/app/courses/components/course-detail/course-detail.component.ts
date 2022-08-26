import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscription } from 'src/app/core/models/inscription';
import { CoursesService } from '../../services/courses.service';
import { DialogDataCourse } from '../courses-table/courses-table.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseStudents$: Promise<any> | undefined;

  displayedColumns: string[] = ['Nombre', 'Acciones'];
  LIST_INSCRIPTIONS: Inscription[] = [];

  dataSource: MatTableDataSource<Inscription> = new MatTableDataSource();
  @ViewChild(MatTable) tabla!: MatTable<Inscription>;

  constructor(private dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataCourse,
    private courseService: CoursesService) { 

  }

  ngOnInit(): void {
    this.courseService.getInscriptions(this.dialogData.course?.commission).subscribe({
      next: (data) => {
        this.LIST_INSCRIPTIONS = (data as Inscription[]);
        this.dataSource = new MatTableDataSource(this.LIST_INSCRIPTIONS);
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

  delete(element: Inscription) {
    this.dataSource.data = this.dataSource.data.filter(student => student.dni !== element.dni);
  }

}
