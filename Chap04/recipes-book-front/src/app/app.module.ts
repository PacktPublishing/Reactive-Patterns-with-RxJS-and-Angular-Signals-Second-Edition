import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from './core/services/recipes.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './core/header/header.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
