import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { IngredientRequest } from '@common/interfaces/ingredientRequest';
import { IngredientResponse } from '@common/interfaces/ingredientResponse';
import { IngredientUpdatingRequest } from '@common/interfaces/ingredientUpdateRequest';

@Injectable()
export class PrismaIngredientsRepository implements IngredientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    recipeId: number,
    receivedValues: IngredientRequest,
    realAmount: number,
  ): Promise<IngredientResponse> {
    const { name, marketWeight, marketPrice, grossWeight } = receivedValues;

    const newIngredient = await this.prisma.ingredient.create({
      data: {
        name,
        marketWeight,
        marketPrice,
        grossWeight,
        realAmount,
        recipeId,
      },
    });
    return newIngredient;
  }

  async singleIngredient(
    receivedId: number,
  ): Promise<IngredientResponse | null> {
    const ingredientFound = await this.prisma.ingredient.findFirst({
      where: { id: receivedId },
    });
    return ingredientFound;
  }

  async delete(receivedId: number): Promise<IngredientResponse> {
    const deletedIngredient = await this.prisma.ingredient.delete({
      where: { id: receivedId },
    });
    return deletedIngredient;
  }

  async update(
    receivedId: number,
    receivedValues: IngredientUpdatingRequest,
    newRealAmount: number,
  ): Promise<any> {
    const { name, marketWeight, marketPrice, grossWeight } = receivedValues;

    const updatedIngredient = await this.prisma.ingredient.update({
      where: { id: receivedId },
      data: {
        name,
        marketWeight,
        marketPrice,
        grossWeight,
        realAmount: newRealAmount,
      },
    });
    return updatedIngredient;
  }
}
