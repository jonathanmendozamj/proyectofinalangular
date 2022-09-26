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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';

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
        MatRadioModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatListModule
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
        MatRadioModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatListModule
    ]
})
export class MaterialModule {

}