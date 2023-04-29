import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService : RecipeService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://wagabat-75dd2-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://wagabat-75dd2-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(response => {
      return response.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }
      })
    }),
    tap(response => {
      this.recipeService.setRecipes(response)
    }))
  }
}
