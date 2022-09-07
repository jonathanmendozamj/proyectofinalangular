import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { AuthService } from "src/app/core/services/auth.service";
import { CoursesService } from "../../services/courses.service";
import { CoursesTableComponent } from "./courses-table.component";

describe('CourseTable', () => {
    let component: CoursesTableComponent;
    let fixture: ComponentFixture<CoursesTableComponent>;
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close', 'open']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['close', 'open']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                MatTableModule,
                HttpClientTestingModule
            ],
            declarations: [ 
                CoursesTableComponent 
            ],
            providers: [
                CoursesService,
                AuthService,
                { provide: MatDialog, useValue: matDialogSpy},
                { provide: MatTableDataSource, useValue: matDialogRefSpy}
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CoursesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should show correct title when load component', () => {
        const titleCourses = fixture.debugElement.query(By.css('h1'));
        fixture.detectChanges();

        expect(titleCourses.nativeElement.textContent).toContain('Tabla de cursos');
    });
});