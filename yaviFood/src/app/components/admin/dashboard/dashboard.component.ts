import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { IFood } from 'src/app/shared/interfaces/IFood';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  foods: Food[] = [];
  food: Food = {
    id: '',
    name: '',
    price: 0,
    tags: [],
    favorite: false,
    stars: 0,
    imageUrl: '',
    origins: [],
    cookTime: ''
  };
  editing = false;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.foodService.getAllFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
    });
  }

  createOrUpdateFood() {
    if (this.editing) {
      this.updateFood();
    } else {
      this.createFood();
    }
  }

  createFood() {
    this.foodService.createFood(this.food).subscribe(() => {
      this.resetForm();
      this.getFoods();
    });
  }

  updateFood() {
    this.foodService.updateFood(this.food).subscribe(() => {
      this.resetForm();
      this.getFoods();
    });
  }

  editFood(food: Food) {
    this.food = { ...food };
    this.editing = true;
  }

  deleteFood(foodId: string) {
    this.foodService.deleteFood(foodId).subscribe(() => {
      this.getFoods();
    });
  }

  cancelEditing() {
    this.resetForm();
  }

  resetForm() {
    this.food = {
      id: '',
      name: '',
      price: 0,
      tags: [],
      favorite: false,
      stars: 0,
      imageUrl: '',
      origins: [],
      cookTime: ''
    };
    this.editing = false;
  }
}
