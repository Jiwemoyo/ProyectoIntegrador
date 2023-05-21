import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(private foodServices: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.foods = this.foodServices.getAllFoodsBySearchTerm(params.searchTerm);
      } else if(params.tag){
        this.foods=this.foodServices.getAllFoodsByTag(params.tag)
      }else {
        this.foods = this.foodServices.getAll();
      }
    });
  }
}
