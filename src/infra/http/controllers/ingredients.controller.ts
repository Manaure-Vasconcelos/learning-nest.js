import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IngredientDTO } from '../DTOs/ingredient-dto';
import { CreateIngredient } from '@application/use-cases/ingredients/create';
import { GetSingleIngredient } from './../../../application/use-cases/ingredients/get-single-ingredient';
import { DeleteIngredient } from './../../../application/use-cases/ingredients/delete-ingredient';
import { SaveIngredient } from '../../../application/use-cases/ingredients/save';
import { IngredientUpdatingDTO } from '../DTOs/ingredient-update';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/ingredients')
export class IngredientsController {
  constructor(
    private createIngredients: CreateIngredient,
    private getSingleIngredient: GetSingleIngredient,
    private deleteIngredient: DeleteIngredient,
    private saveIngredient: SaveIngredient,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  create(@Param('id') recipeId: string, @Body() ingredient: IngredientDTO) {
    const ingredientCreated = this.createIngredients.execute(
      recipeId,
      ingredient,
    );
    return ingredientCreated;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getIngredient(@Param('id') receivedId: string) {
    const sigleIngredient = this.getSingleIngredient.execute(receivedId);
    return sigleIngredient;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') receivedId: string) {
    const deletedIngredient = this.deleteIngredient.execute(receivedId);
    return deletedIngredient;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id') receivedId: string,
    @Body() receivedValues: IngredientUpdatingDTO,
  ) {
    const sigleIngredient = this.saveIngredient.execute(
      receivedId,
      receivedValues,
    );
    return sigleIngredient;
  }
}
