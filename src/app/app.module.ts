import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PostsDashboardComponent } from './shared/components/posts-dashboard/posts-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostformComponent } from './shared/components/postform/postform.component';
import { GetConfirmationComponent } from './shared/components/get-confirmation/get-confirmation.component';
import { PostInterceptorService } from './shared/services/post-inter-ceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsDashboardComponent,
    PostCardComponent,
    PostformComponent,
    GetConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : PostInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
