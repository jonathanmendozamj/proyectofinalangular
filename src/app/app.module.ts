import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontSizeDirective } from './directives/font-size.directive';
import { StudentPipePipe } from './pipes/student-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FontSizeDirective,
    StudentPipePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
