import { ApplicationConfig, NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes/create', component: RecipeCreationComponent},
  { path: 'recipes/details', component: RecipeDetailsComponent},

];


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()]
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
