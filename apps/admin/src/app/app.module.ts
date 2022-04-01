import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {FileUploadModule} from 'primeng/fileupload';






import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list/utilisateur-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard, JwtInterceptor, UtilisateurModule, UtilisateurService } from '@bluebits/utilisateur';
import { UtilisateurFormComponent } from './utilisateur/utilisateur-form/utilisateur-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentListComponent } from './pages/document/document-list/document-list.component';
import { DocumentFormComponent } from './pages/document/document-form/document-form.component';
import { DocumentCompareComponent } from './pages/document/document-compare/document-compare.component';

const UX_MODULE = [
  CardModule,ToolbarModule,ButtonModule,TableModule,InputTextModule,
  ToastModule,ConfirmDialogModule,FileUploadModule
]

const routes : Routes =[
  {path:'', component:ShellComponent ,
  canActivate: [AuthGuard],
   children: [
    {
      path:'dashbord',component:DashbordComponent
    },
    {
      path:'utilisateur',component:UtilisateurListComponent
    },
    {
      path:'utilisateur/form',component:UtilisateurFormComponent
    },
    {
      path:'utilisateur/form/:id',component:UtilisateurFormComponent
    },
    {
      path:'document',component:DocumentListComponent
    },
    {
      path:'document/compare/:id',component:DocumentCompareComponent
    }
  ]}
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashbordComponent, ShellComponent, SidebarComponent, UtilisateurListComponent, UtilisateurFormComponent, DocumentListComponent, DocumentFormComponent, DocumentCompareComponent],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    UtilisateurModule,
    ...UX_MODULE
  ],
  providers: [UtilisateurService,MessageService,ConfirmationService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
