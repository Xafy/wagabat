import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  selectedItemId!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService : ShoppingListService){}

  ngOnInit(): void {
      this.subscription = this.shoppingListService.handleEdit.subscribe(
        (id: number) => {
          this.editMode = true;
          this.selectedItemId = id;
          this.editedItem = this.shoppingListService.getIngredient(this.selectedItemId);
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(form : NgForm){
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (!this.editMode){
      this.shoppingListService.addIngredient(ingredient);
    }
    else {
      this.shoppingListService.editIngredient(this.selectedItemId, ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    if (this.editMode){
      this.shoppingListService.deleteIngredient(this.selectedItemId);
      this.onReset();
    }
  }

  onClear(){
    this.shoppingListService.clearIngredients();
  }

  onReset(){
    this.editMode = false;
    this.shoppingForm.reset();
  }

}
