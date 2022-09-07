import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/core/models/course.model';

describe('CoursesService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new CoursesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of courses', (done: DoneFn) => {
    const mockData = [
      {"nameCourse":"Hidrocarburos Aromaticos","commission":"41876","id":"1"},
      {"nameCourse":"Vue JS","commission":"95909","id":"2"},
      {"nameCourse":"Bootstrap","commission":"49908","id":"3"}
    ];

    httpClientSpy.get.and.returnValue(of(mockData));

    service
      .getAllCourses()
      .subscribe((courses: Course[]) => {
        expect(courses).toEqual(mockData);
        done();
      });
  });

  
});
