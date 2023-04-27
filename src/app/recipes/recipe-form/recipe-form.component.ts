import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
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
  constructor(private route : ActivatedRoute, private recipeService: RecipeService){}

  ngOnInit(): void {
      this.route.params.subscribe( (params: Params)=> {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })  
  }

  initForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '' ;

    if(this.editMode) {
      const recipe = this.recipeService.getRcipe(this.id);
      recipeName = recipe.name,
      recipeDescription = recipe.description,
      recipeImagePath = recipe.imagePath
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(recipeDescription),
      'imagePath': new FormControl(recipeImagePath)
    });
  }

}
