import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { UsersContainerComponent } from './components/users-container/users-container.component';

const routes: Routes = [
    {
        path: 'usuarios', 
        children: [
            {
                path: 'lista', 
                component: UsersContainerComponent,
                title: 'Usuarios',
                canActivate: [AdminGuard]
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