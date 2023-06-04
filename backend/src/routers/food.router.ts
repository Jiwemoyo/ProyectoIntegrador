import { Router } from 'express';
import { sample_foods, sample_tags } from "../data";
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';

const router = Router();

router.get("/base", asyncHandler(
    async(req, res) =>{
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount >0){
            res.send("Base cargada anteriormente")
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Base cargada!")
    }
))
router.get("/",asyncHandler(
    async (req, res) => {
      const foods = await FoodModel.find();
        res.send(foods);
    }
  ))

  router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const foods = await FoodModel.find({name: {$regex:searchRegex}})
      res.send(foods);
    }
  ))

  router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await FoodModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await FoodModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))

  router.get("/tag/:tagName",asyncHandler(
    async (req, res) => {
      const foods = await FoodModel.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))

  //obtener
  router.get("/:foodId", asyncHandler(
    async (req, res) => {
      const food = await FoodModel.findById(req.params.foodId);
      res.send(food);
    }
  ))
  //crear
  router.post('/', asyncHandler(async(req, res)=> {
    const newFood = req.body;
    const createdFood = await FoodModel.create(newFood);
    res.send(createdFood);
  }))
  //actualizar
  router.put('/:foodId', asyncHandler(async(req, res)=> {
    const updateFood = req.body;
    const foodId = req.params.foodId;
    const result = await FoodModel.findByIdAndUpdate(foodId, updateFood, {new: true});
    res.send(result)
  }));
  router.delete('/:foodId', asyncHandler(async (req, res)=>{
    const foodId = req.params.foodId;
    await FoodModel.findByIdAndDelete(foodId);
    res.send('Platillo eliminado exitosamente')
  }))

export default router;