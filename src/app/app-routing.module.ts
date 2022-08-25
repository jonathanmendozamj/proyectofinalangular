import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NoPageFoundComponentComponent } from './core/components/no-page-found-component/no-page-found-component.component';

const routes: Routes = [
	{
		path: 'inicio',
		component: HomeComponent
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