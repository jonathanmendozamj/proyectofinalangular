
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CourseDetailComponent } from './course-detail.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';

describe('CourseDetail', () => {
    let component: CourseDetailComponent;
    let fixture: ComponentFixture<CourseDetailComponent>;
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['close']);
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['close']);
    const data: any = {
        course: {
            id: '',
            nameCourse: '',
            countHours: '',
            countClasses: '',
            professor: '',
            commission: ""
        },
        title: 'Detalle de curso',
        modify: false
    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [ 
                MatSnackBarModule,
                MatDialogModule,
                HttpClientTestingModule,
                MatTableModule
            ],
            declarations: [ 
                CourseDetailComponent 
            ],
            providers: [
                provideMockStore({}),
                { provide: MatSnackBar, useValue: matSnackBarSpy },
                { provide: MatDialogRef, useValue: matDialogSpy },
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatTableDataSource, useValue: matDialogRefSpy}
            ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(CourseDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog when click the button ´Cerrar´', () => {
        const buttonClose = fixture.debugElement.query(By.css('#btnClose'));
        buttonClose.nativeElement.click();
        fixture.detectChanges();

        expect(matDialogSpy.close).toHaveBeenCalled();
    });
});