import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/models/student.state';
import { selectorLoadingStudents } from '../../states/selectors/students.selector';
import * as StudentsAction from '../../states/actions/students.action';


@Component({
  selector: 'app-students-container',
  templateUrl: './students-container.component.html',
  styleUrls: ['./students-container.component.css']
})
export class StudentsContainerComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private studentsStore: Store<StudentState>) { }

  ngOnInit(): void {
    this.studentsStore.dispatch(StudentsAction.loadingStudents());
    this.loading$ = this.studentsStore.select(selectorLoadingStudents);
  }

}
