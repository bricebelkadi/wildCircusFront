import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './pages/content/content.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminArtistComponent } from './pages/admin/admin-artist/admin-artist.component';
import { AdminShowComponent } from './pages/admin/admin-show/admin-show.component';
import { AdminPerformanceComponent } from './pages/admin/admin-performance/admin-performance.component';
import { AdminCustomerComponent } from './pages/admin/admin-customer/admin-customer.component';
import { AdminCircusComponent } from './pages/admin/admin-circus/admin-circus.component';
import { AdminSpecialtyComponent } from './pages/admin/admin-specialty/admin-specialty.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HomeComponent,
    InformationComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AdminArtistComponent,
    AdminShowComponent,
    AdminPerformanceComponent,
    AdminCustomerComponent,
    AdminCircusComponent,
    AdminSpecialtyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    DragDropModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
