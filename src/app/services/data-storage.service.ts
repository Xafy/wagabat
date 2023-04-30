import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService : RecipeService, private authService: AuthService){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>('https://wagabat-75dd2-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes(){
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
      return this.http.get<Recipe[]>(
        'https://wagabat-75dd2-default-rtdb.firebaseio.com/recipes.json',
        {
          params: new HttpParams().set('auth', user?.token || '')
        }
        ) 
      }),
      map(response => {
        return response.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        })
      }),
      tap(response => {
        this.recipeService.setRecipes(response)
      })
    )
  }
}
