import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsContainerComponent } from './components/students-container/students-container.component';

const routes: Routes = [
    {
        path: 'estudiantes', 
        children: [
            {
                path: 'lista', 
                component: StudentsContainerComponent,
                title: 'Estudiantes'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule {

}