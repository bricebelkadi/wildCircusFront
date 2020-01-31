import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { InformationComponent } from './pages/information/information.component';
import { AdminComponent } from './pages/admin/admin.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'content', component: ContentComponent},
  {path: 'information', component: InformationComponent},
  {path: 'join-us', component: HomeComponent},
  {path: 'admin', component: AdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
