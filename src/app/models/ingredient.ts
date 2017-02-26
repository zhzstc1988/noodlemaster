export interface IngredientQuantity {
  [id: string]: number
}

export class Ingredient {
  constructor(
    public id: string,
    public name: string
  ) {}
}

export class IngredientInfo {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public quantity: number
  ) {}
}