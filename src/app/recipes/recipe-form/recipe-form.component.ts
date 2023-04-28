import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit{
  id! : number;
  editMode : boolean = false;
  recipeForm!: FormGroup;
  ingredientsArray!: AbstractControl<any, any>[];
  constructor(private route : ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
      this.route.params.subscribe( (params: Params)=> {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })  
  }

  onSubmit(){
    if(!this.editMode){
      this.recipeService.addRecipe(this.recipeForm.value)
    } else {
      this.recipeService.editRecipe(this.id, this.recipeForm.value)
    }
    this.onFinish()
  }

  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(id: number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(id);
  }

  onFinish(){
    this.router.navigate(['../'], {relativeTo: this.route});
  } 

  initForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '' ;
    let recipeIngredients = new FormArray<any>([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRcipe(this.id);
      recipeName = recipe.name,
      recipeDescription = recipe.description,
      recipeImagePath = recipe.imagePath
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });

    this.ingredientsArray = (this.recipeForm.get('ingredients') as FormArray).controls
  }


}
