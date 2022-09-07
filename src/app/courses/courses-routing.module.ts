import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';

const routes: Routes = [
    {
        path: 'cursos', 
        children: [
            {
                path: 'lista', 
                component: CoursesTableComponent,
                title: 'Cursos'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {
    
}