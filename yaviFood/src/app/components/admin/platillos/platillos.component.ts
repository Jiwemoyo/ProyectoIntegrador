import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css'],
})
export class PlatillosComponent {
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
    cookTime: '',
  };

  tags = {
    Todo: true,
    ComidaRapida: false,
    Postres: false,
    Almuerzos: false,
    Desayunos: false,
    Gourmet: false,
    Jugos: false,
    Sopas: false,
  };

  editing = false;

  constructor(private foodService: FoodService) {}

  getTags(): string[] {
    let newTags: string[];
    newTags = Object.entries(this.tags)
      .map((entrie) => {
        if (entrie[1] === true) {
          return entrie[0];
        } else {
          return 'false';
        }
      })
      .filter((x) => x !== 'false');

    return (this.food.tags = newTags);
  }

  getFoods() {
    this.foodService.getAll().subscribe((foods: Food[]) => {
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
    this.getTags();
    this.foodService.createFood(this.food).subscribe((res) => {
      this.resetForm();
      this.getFoods();
      console.log(res);
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
      cookTime: '',
    };
    this.editing = false;
  }

  ngOnInit() {
    this.getFoods();
  }
  

}
