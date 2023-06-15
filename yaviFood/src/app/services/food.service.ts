import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http:HttpClient) { }

  getAll():  Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag == "All" ?
    this.getAll() :
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
  createFood(food: Food): Observable<Food> {
    return this.http.post<Food>(FOODS_URL, food);
  }

  updateFood(food: Food): Observable<Food> {
    const url = `${FOODS_URL}/${food.id}`;
    return this.http.put<Food>(url, food);
  }

  deleteFood(foodId: string): Observable<any> {
    const url = `${FOODS_URL}/${foodId}`;
    return this.http.delete(url);
  }
}
//comentando para no perderlo
