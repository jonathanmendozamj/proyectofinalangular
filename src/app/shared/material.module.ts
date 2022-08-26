import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
    imports: [
        MatTableModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule
    ],
    exports: [
        MatTableModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule
    ]
})
export class MaterialModule {

}