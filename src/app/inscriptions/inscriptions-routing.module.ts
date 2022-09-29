import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsContainerComponent } from './components/inscriptions-container/inscriptions-container.component';

const routes: Routes = [
    {
        path: 'inscripciones', 
        children: [
            {
                path: 'lista', 
                component: InscriptionsContainerComponent,
                title: 'Inscripciones'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InscriptionsRouterModule {

}