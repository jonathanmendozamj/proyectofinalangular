
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { CourseDetailComponent } from './course-detail.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DIALOG_DATA } from '@angular/cdk/dialog';

describe('CourseDetail', () => {
    let component: CourseDetailComponent;
    let fixture: ComponentFixture<CourseDetailComponent>;
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['close']);
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const data: any = {
        course: {
            id: '',
            nameCourse: '',
            commission: ""
        },
        title: 'Detalle de curso',
        modify: false
    };

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [ 
                MatDialogModule,
                HttpClientTestingModule,
                MatTableModule
            ],
            declarations: [ 
                CourseDetailComponent 
            ],
            providers: [
                {provide: MatDialogRef, useValue: matDialogSpy},
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatTableDataSource, useValue: matDialogRefSpy},
                InscriptionsService
            ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(CourseDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        console.log(component);
        expect(component).toBeTruthy();
    });

    it('should close dialog when click the button ´Cerrar´', () => {
        const buttonClose = fixture.debugElement.query(By.css('#btnClose'));
        buttonClose.nativeElement.click();
        fixture.detectChanges();

        expect(matDialogSpy.close).toHaveBeenCalled();
    });
});