// controllers/food.controller.ts

import { Request, Response } from 'express';
import { FoodModel, Food } from '../models/food.model';
import asyncHandler from 'express-async-handler';
import { sample_foods } from '../data';
import { Types } from 'mongoose';

export const getBase = asyncHandler(async (req: Request, res: Response) => {
    await FoodModel.create(sample_foods);
    res.send('Base cargada!');
});

export const getAllFoods = asyncHandler(async (req: Request, res: Response) => {
    const foods = await FoodModel.find();
    res.send(foods);
});

export const searchFoods = asyncHandler(async (req: Request, res: Response) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
});

export const getTags = asyncHandler(async (req: Request, res: Response) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind: '$tags',
        },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count: '$count',
            },
        },
    ]).sort({ count: -1 });

    res.send(tags);
});

export const getFoodsByTag = asyncHandler(async (req: Request, res: Response) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
});

export const getFoodById = asyncHandler(async (req: Request, res: Response) => {
    const foodId = req.params.foodId;

    try {
        const isValidObjectId = Types.ObjectId.isValid(foodId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const food = await FoodModel.findById(foodId);

        if (!food) {
            res.status(404).send('Platillo no encontrado');
        } else {
            res.send(food);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export const createFood = asyncHandler(async (req: Request, res: Response) => {
    const newFood: Food = req.body;
    const createdFood = await FoodModel.create(newFood);
    res.send(createdFood);
});

export const updateFood = asyncHandler(async (req: Request, res: Response) => {
    const updateFood: Food = req.body;
    const foodId = req.params.foodId;

    try {
        const isValidObjectId = Types.ObjectId.isValid(foodId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const result = await FoodModel.findByIdAndUpdate(foodId, updateFood, { new: true });

        if (!result) {
            res.status(404).send('Platillo no encontrado');
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export const deleteFood = asyncHandler(async (req: Request, res: Response) => {
    const foodId = req.params.foodId;

    try {
        const isValidObjectId = Types.ObjectId.isValid(foodId);
        if (!isValidObjectId) {
            throw new Error('El tipo id no es formato correcto de mongosse');
        }

        const deletedFood = await FoodModel.findByIdAndDelete(foodId);

        if (!deletedFood) {
            res.status(404).send('Platillo no encontrado');
        } else {
            res.send('Platillo eliminado exitosamente');
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});
