import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IngredientDTO } from '../DTOs/ingredient-dto';

@Controller('/ingredients')
export class IngredientsController {
  constructor() {}

  @Post()
  create(@Body() ingredient: IngredientDTO) {
    const ingredientCreated =
      this.ingredientsService.createIngredient(ingredient);
    return ingredientCreated;
  }

  @Get()
  getAllIngredients() {
    const allIngredients = this.ingredientsService.getAllIngredients();
    return allIngredients;
  }

  @Get('/:id')
  getIngredient(@Param('id') receivedId: string) {
    const sigleIngredient = this.ingredientsService.getIngredient(+receivedId);
    return sigleIngredient;
  }

  @Delete('/:id')
  deleteIngredient(@Param('id') receivedId: string) {
    const sigleIngredient = this.ingredientsService.getIngredient(+receivedId);
    return sigleIngredient;
  }

  @Post()
  setValuePartial() {
    this.ingredientsService.setValuePartialOfRecipe();
    return 'Adicionando valor parcial.';
  }

  @Get('/value-partial')
  getValuePartialOfRecipe() {
    return this.ingredientsService.getValuePartialOfRecipe();
  }
}
