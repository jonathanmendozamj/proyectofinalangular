import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: 'inicio',
		component: HomeComponent,
		canActivate: [AuthGuard],
		title: 'Inicio'
	},
	{
		path: 'cursos',
		loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
		canActivate: [AuthGuard],
		canLoad: [AuthGuard]
	},
	{
		path: 'inscripciones',
		loadChildren: () => import('./inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
		canActivate: [AuthGuard],
		canLoad: [AuthGuard]
	},
	{
		path: 'estudiantes',
		loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
		canActivate: [AuthGuard],
		canLoad: [AuthGuard]
	},
	{
		path: 'usuarios',
		loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
		canActivate: [AdminGuard, AuthGuard],
		canLoad: [AdminGuard, AuthGuard]
	},
	{
		path: '',
		redirectTo: '/inicio',
		pathMatch: 'full'
	},
	/*{
		path: '**',
		component: NoPageFoundComponentComponent
	}*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}