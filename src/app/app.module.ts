import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NoPageFoundComponent } from './core/components/no-page-found/no-page-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './core/components/home/home.component';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './core/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './core/states/app.state';
import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    FooterComponent,
    NoPageFoundComponent,
    HomeComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesModule,
    StudentsModule,
    InscriptionsModule,
    AuthModule,
    UsersModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }