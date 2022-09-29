import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CoursesContainerComponent } from "./courses-container.component";
import { CommonModule } from '@angular/common';
import { selectorLoadedCourses, selectorLoadingCourses } from "../../states/selectors/courses.selector";
import { CourseState } from "src/app/core/models/course.state";
import { MemoizedSelector } from "@ngrx/store";
import * as fromCourses from './../../states/reducers/courses.reducer';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CoursesTableComponent } from "../courses-table/courses-table.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";

describe('CoursesContainer', () => {
    let component: CoursesContainerComponent;
    let fixture: ComponentFixture<CoursesContainerComponent>;
    let mockStore: MockStore<CourseState>;
    let mockBooleanSelector: MemoizedSelector<CourseState, boolean>;

    afterEach(() => {
        mockStore?.resetSelectors();
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatProgressSpinnerModule,
                MatDialogModule,
                MatSnackBarModule,
                HttpClientModule
            ],
            providers: [
                provideMockStore()
            ],
            declarations: [
                CoursesContainerComponent,
                CoursesTableComponent
            ]
        });
        fixture = TestBed.createComponent(CoursesContainerComponent);
        mockStore = TestBed.inject(MockStore);

        mockBooleanSelector = mockStore.overrideSelector(
            selectorLoadingCourses,
            false
        );

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', async () => {
        mockBooleanSelector.setResult(false);
        mockStore.refreshState();
        expect(component).toBeTruthy();
    });

    it('should show correct title when load component', async () => {
        mockBooleanSelector.setResult(false);
        mockStore.refreshState();
        const titleCourses = fixture.debugElement.query(By.css('h1'));
        fixture.detectChanges();

        expect(titleCourses.nativeElement.textContent).toContain('Tabla de cursos');
    });
    
});