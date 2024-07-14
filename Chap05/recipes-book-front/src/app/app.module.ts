import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RecipesService } from './core/services/recipes.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './core/header/header.component';
@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        HeaderComponent], providers: [RecipesService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
