import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeMainComponent } from "./recipes/recipe-main/recipe-main.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./recipes/recipe-form/recipe-form.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeMainComponent},
        {path: 'add', component: RecipeFormComponent},
        {path: ':id/edit', component: RecipeFormComponent},
        {path: ':id', component: RecipeDetailComponent}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}