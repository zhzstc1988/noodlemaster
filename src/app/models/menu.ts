import { Ingredient } from './ingredient';

export interface Recipe {
  id: string;
  name: string;
  price: number;
  img: string;
  ingredients: { [ingredientId: string]: number };
}

export interface Order {
  [id: string] : number;
}