import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BggSearchService } from './services/bgg-search/bgg-search.service';
import { ScriptService } from './services/scripts/script.service';
import { CommentService } from './services/comments/comment.service';
import { GoogleAuthService } from '../google-login/GoogleAuth/google-auth.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ModelsService } from './services/models/models.service';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationUnitComponent } from './components/notification-unit/notification-unit.component'; 

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    NotificationUnitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OAuthModule.forRoot(),
    
  ],
  providers: [
    BggSearchService,
    ScriptService,
    GoogleAuthService,
    CommentService,
    ModelsService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
