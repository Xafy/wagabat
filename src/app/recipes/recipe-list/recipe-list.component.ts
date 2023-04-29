import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes!: Recipe[];
  subscription!: Subscription

  constructor(
    private recipesService : RecipeService,
    private router : Router,
    private route : ActivatedRoute  
    ){}

  ngOnInit(): void {
      this.recipes = this.recipesService.getRecipes();
      this.recipesService.recipeChanged.subscribe((recipes)=>{
        this.recipes = recipes
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe(); 
  }

  onAddRecipe(){
    this.router.navigate(['add'], { relativeTo: this.route})
  }


}
