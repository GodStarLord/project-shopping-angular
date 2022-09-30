import { Recipe } from '../model/recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Kunafa Sweet',
      'Kunafa Sweet Description',
      'https://th.bing.com/th/id/OIP.q93W5wlftaIGoYva7NkdYwHaFi?pid=ImgDet&rs=1'
    ),
    new Recipe(
      'Egg Bonda',
      'Egg Bonda Description',
      'https://3.bp.blogspot.com/-UMhQU4LP5x4/UhCM5aQb59I/AAAAAAAAAS8/EVOaF6P0FZE/s1600/100_3227.JPG'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
