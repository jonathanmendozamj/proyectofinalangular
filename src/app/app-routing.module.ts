import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { NoPageFoundComponentComponent } from './components/no-page-found-component/no-page-found-component.component';
import { PostsComponent } from './components/posts/posts.component';
import { StudentsTableComponent } from './students/components/students-table/students-table.component';

const routes: Routes = [
	{
		path: 'inicio',
		component: StudentsTableComponent
	},
	{
		path: 'cursos',
		component: CoursesComponent
	},
	{
		path: 'posts',
		component: PostsComponent
	},
	{
		path: '',
		redirectTo: 'inicio',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: NoPageFoundComponentComponent
	}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}