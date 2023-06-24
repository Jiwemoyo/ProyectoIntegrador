import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import Swal from 'sweetalert2'

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
    if (this.isFormEmpty()) {
      Swal?.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'No se puede crear el platillo con campos vacíos.',
        timer: 2000,
      });
      return;
    }
    
    this.getTags();
    this.foodService.createFood(this.food).subscribe((res) => {
      this.resetForm();
      this.getFoods();
      Swal?.fire({
        icon: 'success',
        title: 'Platillo creado',
        text: 'El platillo se creó correctamente.',
        timer: 2000,
      });
    });
  }
  
  isFormEmpty(): boolean {
    return (
      !this.food.name ||
      !this.food.price ||
      !this.food.cookTime ||
      !this.food.stars ||
      !this.food.imageUrl ||
      this.food.origins.length === 0 ||
      !this.food.tags
    );
  }

  updateFood() {
    this.foodService.updateFood(this.food).subscribe(() => {
      this.resetForm();
      this.getFoods();
      Swal.fire({
        icon: 'success',
        title: 'Platillo actualizado',
        text: 'El platillo se actualizó correctamente.',
        timer: 2000,
      });
    });
  }

  editFood(food: Food) {
    this.food = { ...food };
    this.editing = true;
  }

  deleteFood(foodId: string) {
    this.foodService.deleteFood(foodId).subscribe(() => {
      this.resetForm();
      this.getFoods();
      Swal.fire({
        icon: 'success',
        title: 'Platillo eliminado',
        text: 'Se eliminó correctamente',
        timer: 2000,
      });
    }, (error) => {
      Swal.fire({
        icon: 'success',
        title: 'Platillo eliminado',
        text: 'Se eliminó correctamente',
        timer: 2000,
      });
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
