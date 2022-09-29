import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesService } from '../../services/courses.service';
import { CourseFormComponent } from './course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseForm (new course)', () => {
    let component: CourseFormComponent;
    let fixture: ComponentFixture<CourseFormComponent>;
    const matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const data: any = {
        course: {
            id: '',
            nameCourse: '',
            commission: ""
        },
        title: 'Agregar nuevo curso',
        modify: false
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatDialogModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule
            ],
            declarations: [ 
                CourseFormComponent 
            ],
            providers: [
                provideMockStore({}),
                CoursesService,
                { provide: MatDialogRef, useValue: matDialogSpy},           
                { provide: MAT_DIALOG_DATA, useValue: data }
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CourseFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should form mantain in invalid state when load one field only', () => {
        const formCourse = component.formCourse;
        const nombre = formCourse.controls['nameCourse'];

        nombre.setValue('Portugués');

        expect(formCourse.invalid).toBeTrue();
    });

    it('should form state valid when load all fields', () => {
        const formCourse = component.formCourse;
        const nombre = formCourse.controls['nameCourse'];
        const commission = formCourse.controls['commission'];
        const countHours = formCourse.controls['countHours'];
        const countClasses = formCourse.controls['countClasses'];
        const professor = formCourse.controls['professor'];

        nombre.setValue('Portugués');
        commission.setValue('99999');
        countHours.setValue('10');
        countClasses.setValue('10');
        professor.setValue('Abner');

        expect(formCourse.valid).toBeTrue();
    });

    it('should close dialog when click the button ´Cerrar´', () => {
        const buttonClose = fixture.debugElement.query(By.css('#btnClose'));
        buttonClose.nativeElement.click();
        fixture.detectChanges();

        expect(matDialogSpy.close).toHaveBeenCalled();
    });

    it('should `nameCourse` form field invalid', () => {
        let nameCourseField = component.formCourse.controls['nameCourse'];
        expect(nameCourseField.valid).toBeFalsy();
    });

    it('should `nameCourse` form field error be true when is empty', () => {
        let nameCourseField = component.formCourse.controls['nameCourse'];
        nameCourseField.setValue('');
        expect(nameCourseField.hasError('required')).toBeTruthy();
    });

    it('should `commission` form field invalid', () => {
        let comissionField = component.formCourse.controls['commission'];
        expect(comissionField.valid).toBeFalsy();
    });

    it('should `commission` form field error be true when is empty', () => {
        let comissionField = component.formCourse.controls['commission'];
        comissionField.setValue('');
        expect(comissionField.hasError('required')).toBeTruthy();
    });
});