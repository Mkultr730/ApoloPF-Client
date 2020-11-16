import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material-module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { GoalComponent } from './components/shared/goal/goal.component';
import { NotesComponent } from './components/shared/notes/notes.component';
import { RightInfoComponent } from './components/shared/right-info/right-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DrawerComponent } from './components/shared/drawer/drawer.component';
import { PopperDirective } from './popper.directive';
import { IconPipe } from './pipes/lesson/icon.pipe';
import { TitlePipe } from './pipes/lesson/title.pipe';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { CourseReportComponent } from './components/course-report/course-report.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { ClasePipe } from './pipes/teacher/clase.pipe';
import { IdClasePipe } from './pipes/teacher/id-clase.pipe';
import { ForumComponent } from './components/forum/forum.component';
import { UserNamePipe } from './pipes/forum/user-name.pipe';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { DiscussionAskComponent } from './components/discussion-ask/discussion-ask.component';
import { UserTypePipe } from './pipes/forum/user-type.pipe';
import { StudentsCoursePipe } from './pipes/teacher/students-course.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    HomeComponent,
    ExercisesComponent,
    GoalComponent,
    NotesComponent,
    RightInfoComponent,
    AdminComponent,
    HeaderComponent,
    DrawerComponent,
    PopperDirective,
    IconPipe,
    TitlePipe,
    TeacherHomeComponent,
    CourseReportComponent,
    StudentReportComponent,
    ClasePipe,
    IdClasePipe,
    ForumComponent,
    UserNamePipe,
    DiscussionComponent,
    DiscussionAskComponent,
    UserTypePipe,
    StudentsCoursePipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
