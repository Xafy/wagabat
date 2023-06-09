import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[] = [];
  subscription! : Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
      this.fetchIngredients();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }  

  fetchIngredients(){
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }

  editItemHandler(id: number){
    this.shoppingListService.handleEdit.next(id);
  }

}
