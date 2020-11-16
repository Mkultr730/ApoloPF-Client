import { CourseReportComponent } from './components/course-report/course-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DiscussionAskComponent } from './components/discussion-ask/discussion-ask.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ForumComponent } from './components/forum/forum.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'prueba/:id', component: ExercisesComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'profesor', component: TeacherHomeComponent},
  { path: ':profesorid/:cid', component: CourseReportComponent},
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
  { path: 'forum/:year/:grade/:id', component: DiscussionComponent, canActivate: [AuthGuard] },
  { path: 'ask-question', component: DiscussionAskComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
