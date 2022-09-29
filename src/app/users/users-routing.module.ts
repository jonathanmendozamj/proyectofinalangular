import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersContainerComponent } from './components/users-container/users-container.component';

const routes: Routes = [
    {
        path: 'usuarios', 
        children: [
            {
                path: 'lista', 
                component: UsersContainerComponent,
                title: 'Usuarios'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {

}