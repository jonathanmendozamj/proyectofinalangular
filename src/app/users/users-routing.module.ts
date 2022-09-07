import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';

const routes: Routes = [
    {
        path: 'usuarios', 
        children: [
            {
                path: 'lista', 
                component: UsersTableComponent,
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