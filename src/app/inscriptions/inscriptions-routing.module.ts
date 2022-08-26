import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';

const routes: Routes = [
    {
        path: 'inscripciones', 
        children: [
            {
                path: 'lista', 
                component: InscriptionsTableComponent
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